import React, {
  FC,
  FunctionComponentElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import s from './game-window.module.scss';
import { GameEngine } from './lib/GameEngine';
import { ConsoleController } from './lib/ConsoleController';
import { ConsoleMessageProps } from './ConsoleMessage';

const GameWindow: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<
    FunctionComponentElement<ConsoleMessageProps>[]
  >([]);

  const addMessageHandler = (
    message: FunctionComponentElement<ConsoleMessageProps>
  ) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  useEffect(() => {
    const canvas = document.getElementById('viewport') as HTMLCanvasElement;
    const gameEngine = new GameEngine(canvas);
    gameEngine.init();

    const consoleController = new ConsoleController(
      consoleRef,
      inputRef,
      addMessageHandler,
      gameEngine
    );
    consoleController.addEventListeners();

    return () => {
      consoleController.removeEventListeners();
    };
  }, []);

  return (
    <div className={s.gameWindow}>
      <div className={s.console} ref={consoleRef}>
        <ul className={s.gameWindow__messageList}>{messages}</ul>
        <input
          className={s.consoleInput}
          ref={inputRef}
          type="text"
          autoComplete="off"
        />
      </div>
      <canvas ref={canvasRef} id="viewport" width="640" height="680"></canvas>
    </div>
  );
};

export default GameWindow;