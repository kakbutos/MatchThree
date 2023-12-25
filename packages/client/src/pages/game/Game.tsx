import { EndGame } from '@/widgets/end-game/EndGame';
import { Start } from '@/widgets/start/Start';
import { useState } from 'react';
import GameWindow from '@/widgets/game-window/GameWindow';

enum GameStatus {
  START = 'start',
  GAME = 'game',
  OVER = 'over',
}

export const GamePage: React.FC = () => {
  const [gameStatus, setGameStatus] = useState(GameStatus.GAME);

  return (
    <>
      {gameStatus === GameStatus.START && <Start />}
      {gameStatus === GameStatus.GAME && <GameWindow />}
      {gameStatus === GameStatus.OVER && <EndGame />}
    </>
  );
};
