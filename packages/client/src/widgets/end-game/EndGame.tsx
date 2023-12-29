import s from './end-game.module.scss';
import { FC, useCallback } from 'react';
import { Box, Button, Typography, Zoom } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { GameStore } from '@/store/game';
import { GameStatus } from '@/types/game-status';

export const EndGame: FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    () => dispatch(GameStore.actions.changeStatus(GameStatus.START)),
    []
  );

  return (
    <Box className={s.wr}>
      <Box className={s.box}>
        <Box gridRow="2">
          <Typography className={s.end}>Игра окончена</Typography>
        </Box>
        <Zoom in={true}>
          <Box gridRow="3">
            <Button className={s.again} onClick={handleClick}>
              Начать сначала
            </Button>
          </Box>
        </Zoom>
      </Box>
    </Box>
  );
};
