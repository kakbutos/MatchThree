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
import { TimeBar } from './TimeBar';
import { styled } from '@mui/material';
import { ThemeButton } from '../theme-button/ThemeButton';

const BackgroundDiv = styled('div')(({ theme }) => ({
  height: '100vh',
  minWidth: 'max - content',
  paddingTop: '80px',
  overflowX: 'hidden',
  backgroundColor: theme.palette.background.paper,
}));

const GameWindow: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<
    FunctionComponentElement<ConsoleMessageProps>[]
  >([]);
  const gameEngineRef = useRef<GameEngine | null>(null);

  const addMessageHandler = (
    message: FunctionComponentElement<ConsoleMessageProps>
  ) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  useEffect(() => {
    const canvas = document.getElementById('viewport') as HTMLCanvasElement;
    gameEngineRef.current = new GameEngine(canvas);
    gameEngineRef.current.init();

    const consoleController = new ConsoleController(
      consoleRef,
      inputRef,
      addMessageHandler,
      gameEngineRef.current
    );
    consoleController.addEventListeners();

    return () => {
      consoleController.removeEventListeners();
    };
  }, []);

  return (
    <BackgroundDiv>
      <ThemeButton isAbsolutePosition />
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
        <TimeBar
          endGameHandler={() => {
            gameEngineRef.current!.stopGame();
            return gameEngineRef.current!.getScore();
          }}
        />
        <img
          className={s.astronaut}
          src="/src/assets/images/astronaut.png"
          alt="Астронавт"
        />
        <img
          className={s.astronaut}
          src="/src/assets/images/astronaut.png"
          alt="Астронавт"
        />
      </div>
    </BackgroundDiv>
  );
};

export default GameWindow;
