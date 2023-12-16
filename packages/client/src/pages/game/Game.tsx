import { EndGame } from '@/widgets/end-game/EndGame';
import { Start } from '@/widgets/start/Start';
import { useState } from 'react';

enum GameStatus {
  START = 'start',
  GAME = 'game',
  OVER = 'over',
}

export const GamePage: React.FC = () => {
  const [gameStatus, setGameStatus] = useState(GameStatus.START);

  return (
    <>
      {gameStatus === GameStatus.START && <Start />}
      {gameStatus === GameStatus.GAME && <></>}
      {gameStatus === GameStatus.OVER && <EndGame />}
    </>
  );
};
