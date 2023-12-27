import React, { FunctionComponentElement, RefObject } from 'react';
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
  private currentConsoleHistory: number;

  constructor(
    consoleWindow: RefObject<HTMLDivElement>,
    inputElement: RefObject<HTMLInputElement>,
    addMesageHandler: (
      message: FunctionComponentElement<ConsoleMessageProps>
    ) => void,
    gameEngine: GameEngine
  ) {
    if (!consoleWindow.current) throw new Error('Missing consoleWindow ref');
    if (!inputElement.current) throw new Error('Missing inputElement ref');

    this.consoleWindow = consoleWindow.current;
    this.inputElement = inputElement.current;
    this.addMesageHandler = addMesageHandler;
    this.gameEngine = gameEngine;
    this.consoleHistory = new Array<string>();
    this.currentConsoleHistory = 0;
  }

  public addEventListeners = () => {
    document.addEventListener('keydown', this.handleKeyPress);
    this.inputElement.addEventListener('keydown', this.handleEnterPress);

    this.toggleConsole();
  };

  public removeEventListeners = () => {
    document.removeEventListener('keydown', this.handleKeyPress);
    this.inputElement.removeEventListener('keydown', this.handleEnterPress);
  };

  private handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Backquote') {
      this.toggleConsole();
    }
  };

  private handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const command = this.inputElement.value;
      this.addToConsole(`> ${command}`);
      this.executeCommand(command);
      this.inputElement.value = '';
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();

      if (this.currentConsoleHistory > 0) {
        this.currentConsoleHistory--;
        this.inputElement.value =
          this.consoleHistory[this.currentConsoleHistory];
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      if (this.currentConsoleHistory < this.consoleHistory.length - 1) {
        this.currentConsoleHistory++;
        this.inputElement.value =
          this.consoleHistory[this.currentConsoleHistory];
      } else {
        this.currentConsoleHistory = this.consoleHistory.length;
        this.inputElement.value = '';
      }
    }
  };

  private toggleConsole = () => {
    this.toggleVisibility(this.consoleWindow);
    this.inputElement.focus();
    this.inputElement.value = '';
  };

  private toggleVisibility(element: HTMLElement) {
    if (element.style.visibility === 'hidden') {
      element.style.visibility = 'visible';
    } else {
      element.style.visibility = 'hidden';
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
    const commandLowerCaseArray: string[] = command
      .toLowerCase()
      .trim()
      .split('_');

    // TODO: На кнопки вниз и вверх при открытой консоли нужно добавлять события, чтобы пролистывать историю кнопками.
    this.consoleHistory.push(command);
    this.currentConsoleHistory = this.consoleHistory.length;

    // TODO: Также стоит добавить автоподсказки, какие варианты возможны, чтобы заменить вопросительные знаки.

    if (commandLowerCaseArray[0] === 'help') {
      this.cmdHelp();
    } else if (commandLowerCaseArray[0] === 'toggle_movies') {
      this.cmdToggleMovies();
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` === 'tile_theme'
    ) {
      this.cmdTileTheme(commandLowerCaseArray);
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` === 'new_game'
    ) {
      this.cmdNewGame();
    } else if (commandLowerCaseArray[0] === 'history') {
      this.cmdHistory();
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` === 'clear_line'
    ) {
      this.cmdClearLine(commandLowerCaseArray);
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` === 'swap_tiles'
    ) {
      this.cmdSwapTiles(commandLowerCaseArray);
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` ===
      'clear_color'
    ) {
      this.cmdClearByColor(commandLowerCaseArray);
    } else if (
      `${commandLowerCaseArray[0]}_${commandLowerCaseArray[1]}` === 'toggle_fps'
    ) {
      this.cmdToggleFps();
    } else {
      this.addToConsole(`Unknown command: ${command}`, MessageTypes.ERROR);
    }
  }

  private cmdHelp() {
    const availableCommands = [
      'help',
      'toggle_movies',
      'swap_tiles_?_?_?_?',
      'history',
      'new_game',
      'clear_line_row_?',
      'clear_line_column_?',
      'tile_theme_?',
      'clear_color_?',
      'toggle_fps',
    ];

    this.addToConsole(
      `Available commands: ${availableCommands.join(', ')}`,
      MessageTypes.INFO
    );
  }

  private cmdToggleMovies() {
    this.gameEngine.toggleMovesVisibility();
    this.addToConsole(
      'The visibility mode of moves has been changed',
      MessageTypes.SUCCESS
    );
  }

  private cmdTileTheme(commandLowerCaseArray: string[]) {
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
  }

  private cmdNewGame() {
    this.gameEngine.newGame();
    this.addToConsole(
      'The game has been reset. New game started',
      MessageTypes.SUCCESS
    );
  }

  private cmdHistory() {
    this.addToConsole(`${this.consoleHistory.join(', ')}`, MessageTypes.INFO);
  }

  private cmdClearLine(commandLowerCaseArray: string[]) {
    if (!Number.isInteger(+commandLowerCaseArray[3])) {
      this.addToConsole('Incorrect line', MessageTypes.ERROR);
      return;
    }

    // закрываем консоль, чтобы увидеть результат
    this.toggleConsole();

    setTimeout(() => {
      this.gameEngine.clearLine(
        commandLowerCaseArray[2],
        +commandLowerCaseArray[3]
      );
      this.addToConsole('Cleansing line', MessageTypes.SUCCESS);
    }, 500);
  }

  private cmdSwapTiles(commandLowerCaseArray: string[]) {
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
  }

  private cmdClearByColor(commandLowerCaseArray: string[]) {
    if (!Number.isInteger(+commandLowerCaseArray[2])) {
      this.addToConsole('Incorrect type color', MessageTypes.ERROR);
      return;
    }

    this.toggleConsole();

    setTimeout(() => {
      this.gameEngine.clearByColor(+commandLowerCaseArray[2]);
      this.addToConsole(
        'Color were successfully changed',
        MessageTypes.SUCCESS
      );
    }, 500);
  }

  private cmdToggleFps() {
    this.gameEngine.toggleFps();
    this.addToConsole('Fps were successfully changed', MessageTypes.SUCCESS);
  }
}
