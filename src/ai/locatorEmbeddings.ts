import { Page, Locator } from 'playwright';
import { ElementFingerprint } from '../playwright/selfHealing';

interface EmbeddingMatch {
  locator: Locator;
  similarity: number;
}

/**
 * Uses @huggingface/transformers to generate element embeddings locally
 * and find the most similar element on the page via cosine similarity.
 *
 * The MiniLM model (~50MB) is downloaded on first use.
 */
export class LocatorEmbeddings {
  private pipeline: any = null;
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Dynamic import to avoid loading the model unless needed
      const { pipeline } = await import('@huggingface/transformers');
      this.pipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        // Cache models in extension storage
        cache_dir: undefined, // Will use default cache
      });
      this.initialized = true;
    } catch (err) {
      console.error('Failed to initialize embedding model:', err);
      throw new Error(
        'Embedding model initialization failed. Install @huggingface/transformers or disable embedding-based self-healing.'
      );
    }
  }

  /**
   * Find the visible element on the page most similar to the recorded fingerprint.
   * Returns null if no element exceeds the similarity threshold.
   */
  async findMostSimilar(
    page: Page,
    targetFingerprint: ElementFingerprint,
    threshold: number
  ): Promise<EmbeddingMatch | null> {
    if (!this.pipeline) {
      throw new Error('Embedding model not initialized. Call initialize() first.');
    }

    // Generate the target embedding from the recorded fingerprint
    const targetText = this.fingerprintToText(targetFingerprint);
    const targetEmbedding = await this.embed(targetText);

    // Extract all visible interactive elements from the page
    const candidates = await page.evaluate(() => {
      const interactiveTags = ['a', 'button', 'input', 'select', 'textarea', 'label', 'summary', 'details'];
      const interactiveRoles = ['button', 'link', 'textbox', 'checkbox', 'radio', 'combobox', 'tab', 'menuitem'];

      const elements: Array<{
        index: number;
        tag: string;
        id: string | null;
        classes: string[];
        text: string;
        ariaLabel: string | null;
        ariaRole: string | null;
        testId: string | null;
        placeholder: string | null;
        name: string | null;
        type: string | null;
      }> = [];

      const allElements = document.querySelectorAll('*');
      let index = 0;

      allElements.forEach(el => {
        if (!(el instanceof HTMLElement)) return;

        const rect = el.getBoundingClientRect();
        // Skip invisible elements
        if (rect.width === 0 || rect.height === 0) return;
        if (window.getComputedStyle(el).visibility === 'hidden') return;

        const tag = el.tagName.toLowerCase();
        const role = el.getAttribute('role');

        // Only consider interactive or potentially relevant elements
        const isInteractive = interactiveTags.includes(tag) ||
          (role && interactiveRoles.includes(role)) ||
          el.onclick !== null ||
          el.getAttribute('tabindex') !== null;

        if (!isInteractive && !el.id && !el.getAttribute('data-testid')) return;

        elements.push({
          index: index++,
          tag,
          id: el.id || null,
          classes: Array.from(el.classList).slice(0, 5) as string[],
          text: (el.textContent || '').trim().substring(0, 100),
          ariaLabel: el.getAttribute('aria-label'),
          ariaRole: role,
          testId: el.getAttribute('data-testid'),
          placeholder: (el as HTMLInputElement).placeholder || null,
          name: el.getAttribute('name'),
          type: el.getAttribute('type'),
        });
      });

      return elements;
    });

    if (candidates.length === 0) return null;

    // Generate embeddings for all candidates and find the best match
    let bestMatch: EmbeddingMatch | null = null;
    let bestSimilarity = -1;

    // Process in batches for efficiency
    const batchSize = 32;
    for (let i = 0; i < candidates.length; i += batchSize) {
      const batch = candidates.slice(i, i + batchSize);
      const texts = batch.map(c => this.candidateToText(c));
      const embeddings = await Promise.all(texts.map(t => this.embed(t)));

      for (let j = 0; j < batch.length; j++) {
        const similarity = this.cosineSimilarity(targetEmbedding, embeddings[j]);
        if (similarity > bestSimilarity && similarity >= threshold) {
          bestSimilarity = similarity;
          const candidate = batch[j];

          // Build a locator for this candidate
          let locator: Locator;
          if (candidate.testId) {
            locator = page.getByTestId(candidate.testId);
          } else if (candidate.id) {
            locator = page.locator(`#${candidate.id}`);
          } else if (candidate.ariaRole && candidate.text) {
            locator = page.getByRole(candidate.ariaRole as any, { name: candidate.text.substring(0, 50) });
          } else if (candidate.text) {
            locator = page.getByText(candidate.text.substring(0, 50));
          } else {
            // Fallback to nth-of-type
            locator = page.locator(`${candidate.tag}`).nth(candidate.index);
          }

          bestMatch = { locator, similarity };
        }
      }
    }

    return bestMatch;
  }

  /** Convert a fingerprint to a text representation for embedding */
  private fingerprintToText(fp: ElementFingerprint): string {
    const parts = [
      `tag:${fp.tag}`,
      fp.id ? `id:${fp.id}` : '',
      fp.testId ? `testid:${fp.testId}` : '',
      fp.ariaRole ? `role:${fp.ariaRole}` : '',
      fp.ariaLabel ? `label:${fp.ariaLabel}` : '',
      fp.text ? `text:${fp.text.substring(0, 100)}` : '',
      fp.placeholder ? `placeholder:${fp.placeholder}` : '',
      fp.name ? `name:${fp.name}` : '',
      fp.type ? `type:${fp.type}` : '',
      fp.classes.length ? `class:${fp.classes.join(' ')}` : '',
    ];
    return parts.filter(Boolean).join(' ');
  }

  /** Convert a candidate element to text for embedding */
  private candidateToText(candidate: {
    tag: string;
    id: string | null;
    classes: string[];
    text: string;
    ariaLabel: string | null;
    ariaRole: string | null;
    testId: string | null;
    placeholder: string | null;
    name: string | null;
    type: string | null;
  }): string {
    const parts = [
      `tag:${candidate.tag}`,
      candidate.id ? `id:${candidate.id}` : '',
      candidate.testId ? `testid:${candidate.testId}` : '',
      candidate.ariaRole ? `role:${candidate.ariaRole}` : '',
      candidate.ariaLabel ? `label:${candidate.ariaLabel}` : '',
      candidate.text ? `text:${candidate.text}` : '',
      candidate.placeholder ? `placeholder:${candidate.placeholder}` : '',
      candidate.name ? `name:${candidate.name}` : '',
      candidate.type ? `type:${candidate.type}` : '',
      candidate.classes.length ? `class:${candidate.classes.join(' ')}` : '',
    ];
    return parts.filter(Boolean).join(' ');
  }

  /** Generate an embedding vector from text */
  private async embed(text: string): Promise<number[]> {
    const result = await this.pipeline(text, { pooling: 'mean', normalize: true });
    return Array.from(result.data);
  }

  /** Compute cosine similarity between two vectors */
  private cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB));
  }
}
