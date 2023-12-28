import { EndGame } from '@/widgets/end-game/EndGame';
import { Start } from '@/widgets/start/Start';
import GameWindow from '@/widgets/game-window/GameWindow';
import { useAppSelector } from '@/hooks/useAppSelector';
import { GameStore } from '@/store/game';
import { GameStatus } from '@/types/game-status';

export const GamePage: React.FC = () => {
  const status = useAppSelector(GameStore.selectors.selectGameStatus);
  return (
    <>
      {status === GameStatus.START && <Start />}
      {status === GameStatus.GAME && <GameWindow />}
      {status === GameStatus.OVER && <EndGame />}
    </>
  );
};
