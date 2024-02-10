import s from './end-game.module.scss';
import { FC, useCallback } from 'react';
import { Box, Button, Typography, Zoom, styled } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { GameStore } from '@/store/game';
import { GameStatus } from '@/types/game-status';
import { ThemeButton } from '../theme-button/ThemeButton';

const BackgroundDiv = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  backgroundImage: 'url("/src/assets/images/start-bg.png")',
  backgroundSize: 'auto 90vh',
  backgroundRepeat: 'repeat no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  transition: 'background-position-y 1s',
  backgroundColor: theme.palette.background.paper,
}));

export const EndGame: FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(
    () => dispatch(GameStore.actions.changeStatus(GameStatus.START)),
    []
  );

  return (
    <BackgroundDiv>
      <ThemeButton isAbsolutePosition />
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
    </BackgroundDiv>
  );
};
