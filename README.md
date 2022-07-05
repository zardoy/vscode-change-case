# Change Case Extension for Visual Studio Code
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/hjdarnel/vscode-change-case?style=flat-square)  [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

This is a fork of [wmaurer/vscode-change-case](https://github.com/hjdarnel/vscode-change-case), which I intend to keep up with, track issues, and update regularly.

A wrapper around [node-change-case](https://github.com/blakeembrey/node-change-case) for Visual Studio Code.
Quickly change the case of the current selection or current word.

If only one word is selected, the `extension.changeCase.commands` command gives you a preview of each option:

![change-case-preview](https://cloud.githubusercontent.com/assets/2899448/10712456/3c5e29b6-7a9c-11e5-9ce4-7eb944889696.gif)

`change-case` also works with multiple cursors:

![change-case-multi](https://cloud.githubusercontent.com/assets/2899448/10712454/1a9019e8-7a9c-11e5-8f06-91fd2d7e21bf.gif)

*Note:* Please read the [documentation](https://code.visualstudio.com/Docs/editor/editingevolved) on how to use multiple cursors in Visual Studio Code.

## Install

Launch VS Code Quick Open (Ctrl/Cmd+P), paste the following command, and press enter.
```
ext install change-case
```

## Commands

| Command                           | Output      | Explanation                                                                                   |
|-----------------------------------|-------------|-----------------------------------------------------------------------------------------------|
| `extension.changeCase.commands`   | Hello world | List all commands, with preview if only one word is selected                                  |
| `extension.changeCase.camel`      | helloWorld  | A string with the separators denoted by having the next letter capitalized                    |
| `extension.changeCase.constant`   | HELLO_WORLD | An upper case, underscore separated string                                                    |
| `extension.changeCase.dot`        | hello.world | A lower case, period separated string                                                         |
| `extension.changeCase.kebab`      | hello-world | A lower case, dash separated string (alias for param case)                                    |
| `extension.changeCase.lower`      | hello world | A string in lower case                                                                        |
| `extension.changeCase.lowerFirst` | hello world | A string with the first character lower cased                                                 |
| `extension.changeCase.no`         | hello world | Convert the string without any casing (lower case, space separated)                           |
| `extension.changeCase.param`      | hello-world | A lower case, dash separated string                                                           |
| `extension.changeCase.pascal`     | HelloWorld  | A string denoted in the same fashion as camelCase, but with the first letter also capitalized |
| `extension.changeCase.path`       | hello/world | A lower case, slash separated string                                                          |
| `extension.changeCase.sentence`   | Hello world | A lower case, space separated string                                                          |
| `extension.changeCase.snake`      | Hello_World | A lower case, underscore separated string                                                     |
| `extension.changeCase.snakeUpper` | Hello_World | A underscore separated string with the first character of every word upper cased              |
| `extension.changeCase.swap`       | hELLO WORLD | A string with every character case reversed                                                   |
| `extension.changeCase.title`      | Hello World | A space separated string with the first character of every word upper cased                   |
| `extension.changeCase.upper`      | HELLO WORLD | A string in upper case                                                                        |
| `extension.changeCase.upperFirst` | Hello world | A string with the first character upper cased                                                 |
| `extension.changeCase.sponge`     | hELLo WOrLd | A to a string with random capitalization applied                                              |



## Support

[Create an issue](https://github.com/hjdarnel/vscode-change-case/issues)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://darnell.io"><img src="https://avatars1.githubusercontent.com/u/7868899?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Henry Darnell</b></sub></a><br /><a href="https://github.com/hjdarnel/vscode-change-case/commits?author=hjdarnel" title="Code">💻</a> <a href="https://github.com/hjdarnel/vscode-change-case/commits?author=hjdarnel" title="Documentation">📖</a></td>
    <td align="center"><a href="http://zardoy.com"><img src="https://avatars.githubusercontent.com/u/46503702?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Vitaly</b></sub></a><br /><a href="https://github.com/hjdarnel/vscode-change-case/commits?author=zardoy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/druesendieb"><img src="https://avatars.githubusercontent.com/u/2674011?v=4?s=100" width="100px;" alt=""/><br /><sub><b>druesendieb</b></sub></a><br /><a href="#ideas-druesendieb" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome! 