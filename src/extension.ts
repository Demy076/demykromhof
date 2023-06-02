// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import axios, { AxiosInstance } from "axios";
import { retrieveRandomFact } from "./app/randomFact/random_fact";

const prepareAxiosInstance = (): AxiosInstance => axios.create();

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const storage = context.globalState;
  const axiosInstance = prepareAxiosInstance();
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "demykromhof" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposables = [
    vscode.commands.registerCommand(
      "demykromhof.retrieveRandomFact",
      async () =>
        retrieveRandomFact(axiosInstance)
          .then((fact) =>
            vscode.window.showInformationMessage(
              fact.data?.fact! || "No fact found"
            )
          )
          .catch((error) => vscode.window.showErrorMessage(error.message))
    ),
  ];

  context.subscriptions.push(...disposables);
}

// This method is called when your extension is deactivated
export function deactivate() {
  vscode.window.showInformationMessage("Goodbye from demykromhof!");
}
