import type { Page } from 'playwright';

/**
 * Simplifies the DOM of a page for LLM consumption.
 *
 * Strips scripts, styles, SVG internals, and deeply nested elements.
 * Truncates long attribute values. Targets ~4KB output to fit
 * within LLM context windows.
 */
export class DomSimplifier {
  private readonly MAX_DEPTH = 8;
  private readonly MAX_ELEMENTS = 200;
  private readonly MAX_TEXT_LENGTH = 80;
  private readonly MAX_ATTR_LENGTH = 60;

  /**
   * Get a simplified HTML representation of the current page.
   * Focuses on interactive elements and visible content.
   */
  async simplify(page: Page): Promise<string> {
    const simplified = await page.evaluate(
      ({ maxDepth, maxElements, maxTextLen, maxAttrLen }) => {
        const SKIP_TAGS = new Set(['script', 'style', 'noscript', 'svg', 'path', 'circle',
          'rect', 'line', 'polygon', 'polyline', 'ellipse', 'g', 'defs', 'clippath',
          'lineargradient', 'radialgradient', 'stop', 'symbol', 'use', 'mask',
          'iframe', 'object', 'embed', 'applet', 'meta', 'link', 'base']);

        const KEEP_ATTRS = new Set(['id', 'class', 'role', 'aria-label', 'aria-labelledby',
          'aria-describedby', 'aria-expanded', 'aria-selected', 'aria-checked',
          'data-testid', 'data-test', 'name', 'type', 'href', 'placeholder',
          'value', 'title', 'alt', 'for', 'action', 'method']);

        let elementCount = 0;

        function simplifyNode(node: Node, depth: number): string {
          if (elementCount >= maxElements) return '';
          if (depth > maxDepth) return '...';

          if (node.nodeType === Node.TEXT_NODE) {
            const text = (node.textContent || '').trim();
            if (!text) return '';
            return text.substring(0, maxTextLen);
          }

          if (node.nodeType !== Node.ELEMENT_NODE) return '';

          const el = node as Element;
          const tag = el.tagName.toLowerCase();

          if (SKIP_TAGS.has(tag)) return '';

          // Skip hidden elements
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') return '';

          elementCount++;

          // Build opening tag with relevant attributes
          let attrs = '';
          for (const attrName of KEEP_ATTRS) {
            const value = el.getAttribute(attrName);
            if (value !== null && value !== '') {
              const truncated = value.substring(0, maxAttrLen);
              attrs += ` ${attrName}="${truncated}"`;
            }
          }

          // Self-closing tags
          if (['br', 'hr', 'img', 'input'].includes(tag)) {
            return `<${tag}${attrs}/>`;
          }

          // Process children
          const children: string[] = [];
          for (const child of Array.from(el.childNodes)) {
            const result = simplifyNode(child, depth + 1);
            if (result) children.push(result);
          }

          const inner = children.join('');
          if (!inner && !attrs) return ''; // Skip empty meaningless elements

          return `<${tag}${attrs}>${inner}</${tag}>`;
        }

        return simplifyNode(document.body, 0);
      },
      {
        maxDepth: this.MAX_DEPTH,
        maxElements: this.MAX_ELEMENTS,
        maxTextLen: this.MAX_TEXT_LENGTH,
        maxAttrLen: this.MAX_ATTR_LENGTH,
      }
    );

    // Final truncation to ensure we stay within token limits
    if (simplified.length > 16000) {
      return simplified.substring(0, 16000) + '\n<!-- truncated -->';
    }

    return simplified;
  }
}
