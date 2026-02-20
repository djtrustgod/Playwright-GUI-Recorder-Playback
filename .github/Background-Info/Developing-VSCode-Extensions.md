

**How to Develop and Test VSCode Extensions**

February 17, 2026

Developing and testing VS Code extensions involves a few standardized steps

using official Microsoft tools.

**1\. Set Up Development Environment**

To start, you need **[Node.js](https://nodejs.org/en)** and **Git** installed. You'll use the official [Yeoman generator](https://code.visualstudio.com/api/get-started/your-first-extension) to scaffold your project.


- Install the generator globally: `npm install -g yo generator-code`.
- Run the generator: `yo code`.
- Follow the prompts to choose between **TypeScript** (recommended) or **JavaScript** and name your extension.



**2\. Development and Debugging**

Once your project is generated, you can immediately run it to see it in action:

- **Launch Extension**: Open your project in [VS Code](https://code.visualstudio.com/) and press **F5**. This opens a new window called the **Extension Development Host** where your extension is active.
- **Hot Reloading**: If using TypeScript, the compiler runs in "watch mode" by default. After making changes, press `Ctrl+R` (or `Cmd+R` on Mac) in the Extension Development Host window to reload and see your updates.
- **Debugging**: You can set breakpoints in your `src/extension.ts` file, and the debugger will stop execution in the Extension Development Host when triggered.



**3\. Testing Your Extension**

VS Code provides built-in support for integration testing via the `@vscode/test-electron` library.


- **Run Tests**: In your project, select the **Launch Tests** configuration from the Debug view dropdown and press **F5**. Alternatively, run `npm test` from your terminal.
- **Test Structure**: Tests are typically located in the `src/test` folder. Files matching the `*.test.ts` pattern are automatically discovered and run.
- **Automated Testing**: For advanced scenarios, you can use the [VS Code Testing API](https://code.visualstudio.com/api/extension-guides/testing) to discover and display test results directly in the VS Code Test Explorer.
- **End-to-End Testing**: For webview-based extensions, tools like [WebdriverIO](https://webdriver.io/docs/extension-testing/vscode-extensions/) can be used for full browser-like automation.



**4\. Packaging and Publishing**

- **Package**: Use the [vsce tool](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) to bundle your extension into a `.vsix` file: `npx vsce package`.
- **Publish**: To share it on the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode), you'll need an Azure DevOps Personal Access Token (PAT) and a publisher ID.


