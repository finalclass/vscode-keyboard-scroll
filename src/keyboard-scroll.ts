import * as vscode from 'vscode';

enum Scroll {
	Center,
	Top,
	Bottom
}

var scrollPosition: Scroll = Scroll.Center; 
export function activate(context: vscode.ExtensionContext): void {
	vscode.window.onDidChangeTextEditorSelection(() => {
		scrollPosition = Scroll.Center;
	});
	context.subscriptions.push(vscode.commands.registerCommand(
		'emacs.C-l', () => {
			if (scrollPosition === Scroll.Center) {
				vscode.window.activeTextEditor.revealRange(
					vscode.window.activeTextEditor.selection,
					vscode.TextEditorRevealType.InCenter
				);
				scrollPosition = Scroll.Top;
			} else if (scrollPosition === Scroll.Top) {
				let promises = [
					vscode.commands.executeCommand("scrollPageDown"),
					vscode.commands.executeCommand("scrollPageDown")
				];
				
				Promise.all(promises).then(() => {
					vscode.window.activeTextEditor.revealRange(
						vscode.window.activeTextEditor.selection,
						vscode.TextEditorRevealType.Default
					);
					scrollPosition = Scroll.Bottom;
				});
			} else if (scrollPosition === Scroll.Bottom) {
				let promises = [
					vscode.commands.executeCommand("scrollPageUp"),
					vscode.commands.executeCommand("scrollPageUp")
				];
				
				Promise.all(promises).then(() => {
					vscode.window.activeTextEditor.revealRange(
						vscode.window.activeTextEditor.selection,
						vscode.TextEditorRevealType.Default
					);
					scrollPosition = Scroll.Center;
				});
			}
		})
	);
}

export function deactivate(): void {
}
