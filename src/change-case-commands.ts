import * as vscode from 'vscode';
import { EOL } from 'os';
import * as changeCase from 'change-case';
import { lowerCase } from 'lower-case';
import { swapCase } from 'swap-case';
import { titleCase } from 'title-case';
import { upperCase } from 'upper-case';
import { upperCaseFirst } from 'upper-case-first';
import { snakeUpper } from './utils';
import { spongeCase } from 'sponge-case';
import { Utils as UriUtils } from 'vscode-uri';
import { extname } from 'path';

const lodashUniq = require('lodash.uniq');

export const COMMAND_LABELS = {
    camel: 'camel',
    constant: 'constant',
    dot: 'dot',
    kebab: 'kebab',
    lower: 'lower',
    lowerFirst: 'lowerFirst',
    no: 'no',
    param: 'param',
    pascal: 'pascal',
    path: 'path',
    sentence: 'sentence',
    snake: 'snake',
    snakeUpper: 'snakeUpper',
    swap: 'swap',
    title: 'title',
    upper: 'upper',
    upperFirst: 'upperFirst',
    sponge: 'sPonGeCaSe',
};

const COMMAND_DEFINITIONS = [
    {
        label: COMMAND_LABELS.camel,
        description: 'Convert to a string with the separators denoted by having the next letter capitalized',
        func: changeCase.camelCase,
    },
    {
        label: COMMAND_LABELS.constant,
        description: 'Convert to an upper case, underscore separated string',
        func: changeCase.constantCase,
    },
    {
        label: COMMAND_LABELS.dot,
        description: 'Convert to a lower case, period separated string',
        func: changeCase.dotCase,
    },
    {
        label: COMMAND_LABELS.kebab,
        description: 'Convert to a lower case, dash separated string (alias for param case)',
        func: changeCase.paramCase,
    },
    { label: COMMAND_LABELS.lower, description: 'Convert to a string in lower case', func: lowerCase },
    {
        label: COMMAND_LABELS.lowerFirst,
        description: 'Convert to a string with the first character lower cased',
        func: lowerCase,
    },
    {
        label: COMMAND_LABELS.no,
        description: 'Convert the string without any casing (lower case, space separated)',
        func: changeCase.noCase,
    },
    {
        label: COMMAND_LABELS.param,
        description: 'Convert to a lower case, dash separated string',
        func: changeCase.paramCase,
    },
    {
        label: COMMAND_LABELS.pascal,
        description:
            'Convert to a string denoted in the same fashion as camelCase, but with the first letter also capitalized',
        func: changeCase.pascalCase,
    },
    {
        label: COMMAND_LABELS.path,
        description: 'Convert to a lower case, slash separated string',
        func: changeCase.pathCase,
    },
    {
        label: COMMAND_LABELS.sentence,
        description: 'Convert to a lower case, space separated string',
        func: changeCase.sentenceCase,
    },
    {
        label: COMMAND_LABELS.snake,
        description: 'Convert to a lower case, underscore separated string',
        func: changeCase.snakeCase,
    },
    {
        label: COMMAND_LABELS.snakeUpper,
        description: 'Convert to a underscore-separated string with the first character of every word upper cased',
        func: snakeUpper,
    },
    {
        label: COMMAND_LABELS.swap,
        description: 'Convert to a string with every character case reversed',
        func: swapCase,
    },
    {
        label: COMMAND_LABELS.title,
        description: 'Convert to a space separated string with the first character of every word upper cased',
        func: titleCase,
    },
    { label: COMMAND_LABELS.upper, description: 'Convert to a string in upper case', func: upperCase },
    {
        label: COMMAND_LABELS.upperFirst,
        description: 'Convert to a string with the first character upper cased',
        func: upperCaseFirst,
    },
    {
        label: COMMAND_LABELS.sponge,
        description: 'Convert to a to a string with random capitalization applied',
        func: spongeCase,
    },
];

export function changeCaseCommands() {
    const firstSelectedText = getSelectedTextIfOnlyOneSelection();

    // if there's only one selection, show a preview of what it will look like after conversion in the QuickPickOptions,
    // otherwise use the description used in COMMAND_DEFINITIONS
    const items: vscode.QuickPickItem[] = COMMAND_DEFINITIONS.map((c) => ({
        label: c.label,
        description: firstSelectedText ? c.func(firstSelectedText) : c.description,
    }));

    vscode.window
        .showQuickPick(items, {
            placeHolder: 'Select case variant for converstion',
        })
        .then((command) => runCommand(command.label));
}

export async function renameFileCommand(variantArg?: keyof typeof COMMAND_LABELS) {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }
    const { uri: sourceUri } = activeEditor.document;
    const fullFileName = UriUtils.basename(sourceUri);
    let fileName = fullFileName;
    let fullExt = '';
    // cut extension twice e.g. file.test.ts -> file & .test.ts
    for (const _i of Array.from({ length: 2 })) {
        const ext = extname(fileName);
        if (!ext.length) {
            continue;
        }
        fileName = fileName.slice(0, -ext.length);
        fullExt = `${ext}${fullExt}`;
    }

    let newFileName: string;
    if (variantArg) {
        const variantLabel = COMMAND_LABELS[variantArg];
        const commandDefinition = COMMAND_DEFINITIONS.find((c) => c.label === variantLabel);
        newFileName = commandDefinition.func(fileName);
    } else {
        const items: vscode.QuickPickItem[] = COMMAND_DEFINITIONS.map((c) => ({
            label: c.label,
            description: c.func(fileName),
        }));

        const selectedVariant = await vscode.window.showQuickPick(items, {
            title: `Renaming ${fullFileName}`,
            placeHolder: 'Select case variant for file name converstion',
        });
        if (!selectedVariant) {
            return;
        }
        newFileName = selectedVariant.description!;
    }
    const edit = new vscode.WorkspaceEdit();
    edit.renameFile(sourceUri, UriUtils.joinPath(sourceUri, '..', `${newFileName}${fullExt}`));
    await vscode.workspace.applyEdit(edit);
}

export function runCommand(commandLabel: string) {
    const commandDefinition = COMMAND_DEFINITIONS.filter((c) => c.label === commandLabel)[0];
    if (!commandDefinition) {
        return;
    }

    const editor = vscode.window.activeTextEditor;
    const { document, selections } = editor;

    let replacementActions = [];

    editor
        .edit((editBuilder) => {
            replacementActions = selections.map((selection) => {
                const { text, range } = getSelectedText(selection, document);

                let replacement;
                let offset;

                if (selection.isSingleLine) {
                    replacement = commandDefinition.func(text);
                    // it's possible that the replacement string is shorter or longer than the original,
                    // so calculate the offsets and new selection coordinates appropriately
                    offset = replacement.length - text.length;
                } else {
                    const lines = document.getText(range).split(EOL);

                    const replacementLines = lines.map((x) => {
                        let replacement = commandDefinition.func(x);
                        return replacement;
                    });
                    replacement = replacementLines.reduce((acc, v) => (!acc ? '' : acc + EOL) + v, undefined);
                    offset = replacementLines[replacementLines.length - 1].length - lines[lines.length - 1].length;
                }

                return {
                    text,
                    range,
                    replacement,
                    offset,
                    newRange: isRangeSimplyCursorPosition(range)
                        ? range
                        : new vscode.Range(
                              range.start.line,
                              range.start.character,
                              range.end.line,
                              range.end.character + offset
                          ),
                };
            });

            replacementActions
                .filter((x) => x.replacement !== x.text)
                .forEach((x) => {
                    editBuilder.replace(x.range, x.replacement);
                });
        })
        .then(() => {
            const sortedActions = replacementActions.sort((a, b) => compareByEndPosition(a.newRange, b.newRange));

            // in order to maintain the selections based on possible new replacement lengths, calculate the new
            // range coordinates, taking into account possible edits earlier in the line
            const lineRunningOffsets = lodashUniq(sortedActions.map((s) => s.range.end.line)).map((lineNumber) => ({
                lineNumber,
                runningOffset: 0,
            }));

            const adjustedSelectionCoordinateList = sortedActions.map((s) => {
                const lineRunningOffset = lineRunningOffsets.filter((lro) => lro.lineNumber === s.range.end.line)[0];
                const range = new vscode.Range(
                    s.newRange.start.line,
                    s.newRange.start.character + lineRunningOffset.runningOffset,
                    s.newRange.end.line,
                    s.newRange.end.character + lineRunningOffset.runningOffset
                );
                lineRunningOffset.runningOffset += s.offset;
                return range;
            });

            // now finally set the newly created selections
            editor.selections = adjustedSelectionCoordinateList.map((r) => toSelection(r));
        });
}

function getSelectedTextIfOnlyOneSelection(): string {
    const editor = vscode.window.activeTextEditor;
    const { document, selection, selections } = editor;

    // check if there's only one selection or if the selection spans multiple lines
    if (selections.length > 1 || selection.start.line !== selection.end.line) {
        return undefined;
    }

    return getSelectedText(selections[0], document).text;
}

function getSelectedText(
    selection: vscode.Selection,
    document: vscode.TextDocument
): { text: string; range: vscode.Range } {
    let range: vscode.Range;

    if (isRangeSimplyCursorPosition(selection)) {
        range = getChangeCaseWordRangeAtPosition(document, selection.end);
    } else {
        range = new vscode.Range(selection.start, selection.end);
    }

    return {
        text: range ? document.getText(range) : undefined,
        range,
    };
}

const CHANGE_CASE_WORD_CHARACTER_REGEX = /([\w_\.\-\/$]+)/;
const CHANGE_CASE_WORD_CHARACTER_REGEX_WITHOUT_DOT = /([\w_\-\/$]+)/;

// Change Case has a special definition of a word: it can contain special characters like dots, dashes and slashes
function getChangeCaseWordRangeAtPosition(document: vscode.TextDocument, position: vscode.Position) {
    const configuration = vscode.workspace.getConfiguration('changeCase');
    const includeDotInCurrentWord = configuration ? configuration.get('includeDotInCurrentWord', false) : false;
    const regex = includeDotInCurrentWord
        ? CHANGE_CASE_WORD_CHARACTER_REGEX
        : CHANGE_CASE_WORD_CHARACTER_REGEX_WITHOUT_DOT;

    const range = document.getWordRangeAtPosition(position);
    if (!range) {
        return undefined;
    }

    let startCharacterIndex = range.start.character - 1;
    while (startCharacterIndex >= 0) {
        const charRange = new vscode.Range(
            range.start.line,
            startCharacterIndex,
            range.start.line,
            startCharacterIndex + 1
        );
        const character = document.getText(charRange);
        if (character.search(regex) === -1) {
            // no match
            break;
        }
        startCharacterIndex--;
    }

    const lineMaxColumn = document.lineAt(range.end.line).range.end.character;
    let endCharacterIndex = range.end.character;
    while (endCharacterIndex < lineMaxColumn) {
        const charRange = new vscode.Range(range.end.line, endCharacterIndex, range.end.line, endCharacterIndex + 1);
        const character = document.getText(charRange);
        if (character.search(regex) === -1) {
            // no match
            break;
        }
        endCharacterIndex++;
    }

    return new vscode.Range(range.start.line, startCharacterIndex + 1, range.end.line, endCharacterIndex);
}

function isRangeSimplyCursorPosition(range: vscode.Range): boolean {
    return range.start.line === range.end.line && range.start.character === range.end.character;
}

function toSelection(range: vscode.Range): vscode.Selection {
    return new vscode.Selection(range.start.line, range.start.character, range.end.line, range.end.character);
}

function compareByEndPosition(a: vscode.Range | vscode.Selection, b: vscode.Range | vscode.Selection): number {
    if (a.end.line < b.end.line) {
        return -1;
    }
    if (a.end.line > b.end.line) {
        return 1;
    }
    if (a.end.character < b.end.character) {
        return -1;
    }
    if (a.end.character > b.end.character) {
        return 1;
    }
    return 0;
}
