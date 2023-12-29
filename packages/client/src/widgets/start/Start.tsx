import s from './start.module.scss';
import { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Slide, Typography, Zoom } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { GameStore } from '@/store/game';
import { GameStatus } from '@/types/game-status';

export const Start: FC = () => {
  const [started, setStarted] = useState(false);
  return (
    <Box className={`${s.wr} ${started && s.wr_started}`}>
      {started ? (
        <CountDown />
      ) : (
        <Button onClick={() => setStarted(true)} className={s.btn}>
          НАЧАТЬ ИГРУ
        </Button>
      )}
    </Box>
  );
};

const timeAfterTheEndOfCountdown = 500;

const CountDown: FC = () => {
  const dispatch = useAppDispatch();

  const [over, setOver] = useState(false);
  const [time, setTime] = useState(3);

  const tick = () => {
    if (over) return;
    if (time === 1) {
      setOver(true);
      setTimeout(() => {
        dispatch(GameStore.actions.changeStatus(GameStatus.GAME));
      }, timeAfterTheEndOfCountdown);
    } else {
      setTime(time - 1);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <Box className={s.box}>
      <Box gridRow="2">
        <Typography className={s.ready}>{over ? 'Начали!' : time}</Typography>
      </Box>
      <Zoom in={true}>
        <Box gridRow="3">
          <Typography className={s.info}>
            Собери в ряд три одинаковые фишки, <br /> меняя местами соседние
          </Typography>
        </Box>
      </Zoom>
      <Box className={s.astronaut}>
        <Slide direction="down" in={true} timeout={700}>
          <img src="/src/assets/images/astronaut.png" alt="Астронавт" />
        </Slide>
      </Box>
    </Box>
  );
};
