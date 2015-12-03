import * as vscode from 'vscode'; 
import {TextEditorRevealType} from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "keyboard-scroll" is now active!'); 

	context.subscriptions.push(vscode.commands.registerCommand('keyboardScroll.center', () => {
		vscode.window.activeTextEditor.revealRange(
			vscode.window.activeTextEditor.selection.with(),
			TextEditorRevealType.InCenter
		);
	}));
}