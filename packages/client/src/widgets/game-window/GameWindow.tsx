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
  const fullscreenRef = useRef<HTMLImageElement>(null);
  const pageWrapper = useRef<HTMLDivElement>(null);

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
    fullscreenRef.current?.addEventListener('click', fullscreenHandler);

    return () => {
      consoleController.removeEventListeners();
      fullscreenRef.current?.removeEventListener('click', fullscreenHandler);
    };
  }, []);

  const fullscreenHandler = (): void => {
    if (!document.fullscreenEnabled) return;

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      pageWrapper.current!.style.overflow = 'hidden';
      pageWrapper.current!.scrollTo(0, 0);
      return;
    }

    document.exitFullscreen();
    pageWrapper.current!.style.overflow = 'auto';
  };

  return (
    <BackgroundDiv ref={pageWrapper}>
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
        <img
          className={s.fullscreenIcon}
          src="/src/assets/icons/fullscreen.svg"
          alt="Полный экран"
          ref={fullscreenRef}
          title="Полноэкранный режим"
        />
        <canvas ref={canvasRef} id="viewport" width="640" height="680"></canvas>
        <TimeBar />
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
