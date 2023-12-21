import React, { FunctionComponentElement, MutableRefObject } from 'react';
import ConsoleMessage, { ConsoleMessageProps } from '../ConsoleMessage';
import { MessageTypes } from '../types/message-types.enum';
import { GameEngine } from './GameEngine';

export class ConsoleController {
  private consoleWindow: HTMLDivElement;
  private inputElement: HTMLInputElement;
  public addMesageHandler: (
    message: FunctionComponentElement<ConsoleMessageProps>
  ) => void;
  private gameEngine: GameEngine;
  private consoleHistory: string[];

  constructor(
    consoleWindow: MutableRefObject<HTMLDivElement>,
    inputElement: MutableRefObject<HTMLInputElement>,
    addMesageHandler: (
      message: FunctionComponentElement<ConsoleMessageProps>
    ) => void,
    gameEngine: GameEngine
  ) {
    this.consoleWindow = consoleWindow.current;
    this.inputElement = inputElement.current;
    this.addMesageHandler = addMesageHandler;
    this.addEventListeners = this.addEventListeners.bind(this);
    this.toggleConsole = this.toggleConsole.bind(this);
    this.gameEngine = gameEngine;
    this.consoleHistory = new Array<string>();
  }

  public addEventListeners() {
    document.addEventListener('keydown', event => {
      if (event.code === 'Backquote') {
        this.toggleConsole();
      }
    });

    this.inputElement.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const command = this.inputElement.value;
        this.addToConsole(`> ${command}`);
        this.executeCommand(command);
        this.inputElement.value = '';
      }
    });

    this.toggleConsole();
  }

  private toggleConsole() {
    this.toggleVisibility(this.consoleWindow);
    this.inputElement.focus();
    this.inputElement.value = '';
  }

  private toggleVisibility(element: HTMLElement) {
    if (element.style.visibility === "hidden") {
      element.style.visibility = "visible";
    } else {
      element.style.visibility = "hidden";
    }
  }

  private addToConsole(
    inputMessage: string,
    messageType: MessageTypes = MessageTypes.DEFAULT
  ) {
    const messageComponent = React.createElement(ConsoleMessage, {
      message: inputMessage,
      messageType: messageType,
    });
    this.addMesageHandler(messageComponent);
  }

  private executeCommand(command: string) {
    const commandLowerCase = command.toLowerCase().trim();
    const commandLowerCaseArray = commandLowerCase.split('_');

    // TODO: На кнопки вниз и вверх при открытой консоли нужно добавлять события, чтобы пролистывать историю кнопками.
    this.consoleHistory.push(command);

    // TODO: Возможно стоит переписать на switch-case для чистоты, но не уверен как это красиво сделать, так как использую и commandLowerCase и commandLowerCaseArray одновременно.

    // TODO: Также стоит добавить автоподсказки, какие варианты возможны, чтобы заменить вопросительные знаки.

    if (commandLowerCase === 'help') {
      const availableCommands = [
        'help',
        'toggle_movies',
        'swap_tiles_?_?_?_?',
        'history',
        'new_game',
        'clear_line_?',
        'tile_theme_?',
      ];
      this.addToConsole(
        `Available commands: ${availableCommands.join(', ')}`,
        MessageTypes.INFO
      );
    } else if (commandLowerCase === 'toggle_movies') {
      this.gameEngine.toggleMovesVisibility();
      this.addToConsole(
        'The visibility mode of moves has been changed',
        MessageTypes.SUCCESS
      );
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` === 'tile_theme'
    ) {
      if (commandLowerCaseArray[2] === 'bliss') {
        this.gameEngine.setBlissTileTheme();
        this.addToConsole(
          'Theme has been successfully changed!!',
          MessageTypes.SUCCESS
        );
      } else if (commandLowerCaseArray[2] === 'vintage') {
        this.gameEngine.setVintageTileTheme();
        this.addToConsole(
          'Theme has been successfully changed!!',
          MessageTypes.SUCCESS
        );
      } else if (commandLowerCaseArray[2] === 'candy') {
        this.gameEngine.setCandyTileTheme();
        this.addToConsole(
          'Theme has been successfully changed!!',
          MessageTypes.SUCCESS
        );
      } else {
        this.addToConsole('Theme was not found :(', MessageTypes.ERROR);
      }
    } else if (commandLowerCase === 'new_game') {
      this.gameEngine.newGame();
      this.addToConsole(
        'The game has been reset. New game started',
        MessageTypes.SUCCESS
      );
    } else if (commandLowerCase === 'history') {
      this.addToConsole(`${this.consoleHistory.join(', ')}`, MessageTypes.INFO);
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` === 'clear_line'
    ) {
      if (!Number.isInteger(+commandLowerCaseArray[2])) {
        this.addToConsole('Incorrect line', MessageTypes.ERROR);
        return;
      }

      this.gameEngine.clearLine(+commandLowerCaseArray[2]);
      this.addToConsole('Cleansing line', MessageTypes.SUCCESS);
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` === 'swap_tiles'
    ) {
      if (
        Number.isInteger(+commandLowerCaseArray[2]) &&
        Number.isInteger(+commandLowerCaseArray[3]) &&
        Number.isInteger(+commandLowerCaseArray[4]) &&
        Number.isInteger(+commandLowerCaseArray[5])
      ) {
        this.gameEngine.mouseSwap(
          +commandLowerCaseArray[2],
          +commandLowerCaseArray[3],
          +commandLowerCaseArray[4],
          +commandLowerCaseArray[5]
        );
        this.addToConsole(
          'Tiles were successfully swapped',
          MessageTypes.SUCCESS
        );
        return;
      }

      this.addToConsole('Incorrect coordinates', MessageTypes.ERROR);
    } else {
      this.addToConsole(`Unknown command: ${command}`, MessageTypes.ERROR);
    }
  }
}
