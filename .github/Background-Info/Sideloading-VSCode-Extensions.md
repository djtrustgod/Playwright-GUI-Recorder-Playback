

**Sideloading VSCode extensions**

February 17, 2026

Sideloading refers to

installing **VS Code extensions** manually without using the official [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode). This is commonly used for internal company tools, testing extensions during development, or using forks from GitHub.
![GitHub](<Base64-Image-Removed>)GitHub +4

How to Sideload an Extension

The primary method for sideloading is using a **.vsix** file (a packaged extension).
![GitHub](<Base64-Image-Removed>)GitHub +1

- **Via the VS Code UI:**
1. Open the **Extensions view** (`Ctrl+Shift+X`).
2. Click the **...** (More Actions) icon at the top of the pane.
3. Select Install from VSIX... and choose your file.
- **Via Command Line (CLI):**

Use the `--install-extension` flag followed by the path to the `.vsix` file.








bash







```
code --install-extension /path/to/extension.vsix
```









Use code with caution.

- **Direct Folder Method:**

You can manually copy unzipped extension folders into your local extensions directory:
  - **Windows:**`%USERPROFILE%\.vscode\extensions`
  - **macOS/Linux:**`~/.vscode/extensions`
    ![Stack Overflow](<Base64-Image-Removed>)Stack Overflow +6

Key Considerations

- **Auto-Updates:** Sideloaded extensions do **not** automatically update through the Marketplace.
- **Security:** Use caution when sideloading. Extensions have the same permissions as VS Code itself and can execute code on your machine.
- **Development:** If you are building an extension, you can "sideload" for testing by pressing `F5` in your project to launch an **Extension Development Host** window.
- **Web Version:** For [`vscode.dev`](https://vscode.dev/), you can use the **Developer: Install Extension From Location...** command to load an extension hosted on a local server.
![GitHub](<Base64-Image-Removed>)GitHub +5


Would you like instructions on how to **package** your own code into a `.vsix` file using [vsce](https://code.visualstudio.com/api/working-with-extensions/bundling-extension)?

Good response

Bad response

Thank you

Your feedback helps Google improve. See our [Privacy Policy](https://policies.google.com/privacy?hl=en).

Share more feedbackReport a problemClose

![undefined](<Base64-Image-Removed>)

![undefined](<Base64-Image-Removed>)

![undefined](<Base64-Image-Removed>)

13 sites

- [Building,-Debugging-and-Sideloading-the-extension-in-Visual .... Opens in new tab.](https://github.com/microsoft/vscode-go/blob/master/docs/Building,-Debugging-and-Sideloading-the-extension-in-Visual-Studio-Code.md)





Building,-Debugging-and-Sideloading-the-extension-in-Visual ...

You can set up a development environment for debugging the extension during extension development. \* Building and Debugging the ex...











GitHub

















- [Extension Marketplace - Visual Studio Code. Opens in new tab.](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace)





Extension Marketplace - Visual Studio Code

Browse for extensions \* This will show you a list of the most popular VS Code extensions on the VS Code Marketplace. \* Each extens...











Visual Studio Code

















- [Install extension - vscode-docs. Opens in new tab.](https://vscode-docs.readthedocs.io/en/latest/extensions/install-extension/)





Install extension - vscode-docs

Sharing Privately with Others (Side-loading) If you want to share your extension or customization with others privately, you can s...











Read the Docs


Show all

![undefined](<Base64-Image-Removed>)

![undefined](<Base64-Image-Removed>)

![undefined](<Base64-Image-Removed>)

13 sites

- [Building,-Debugging-and-Sideloading-the-extension-in-Visual .... Opens in new tab.](https://github.com/microsoft/vscode-go/blob/master/docs/Building,-Debugging-and-Sideloading-the-extension-in-Visual-Studio-Code.md)





Building,-Debugging-and-Sideloading-the-extension-in-Visual ...

You can set up a development environment for debugging the extension during extension development. \* Building and Debugging the ex...











GitHub

















- [Extension Marketplace - Visual Studio Code. Opens in new tab.](https://code.visualstudio.com/docs/configure/extensions/extension-marketplace)





Extension Marketplace - Visual Studio Code

Browse for extensions \* This will show you a list of the most popular VS Code extensions on the VS Code Marketplace. \* Each extens...











Visual Studio Code

















- [Install extension - vscode-docs. Opens in new tab.](https://vscode-docs.readthedocs.io/en/latest/extensions/install-extension/)





Install extension - vscode-docs

Sharing Privately with Others (Side-loading) If you want to share your extension or customization with others privately, you can s...








Read the Docs

- [Install the Power Platform Tools Visual Studio Code extension. Opens in new tab.](https://learn.microsoft.com/en-us/power-platform/developer/howto/install-vs-code-extension)


