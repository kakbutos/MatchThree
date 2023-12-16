import s from './end-game.module.scss';
import { FC } from 'react';
import { Box, Typography, Zoom } from '@mui/material';

export const EndGame: FC = () => {
  return (
    <Box className={s.wr}>
      <Box className={s.box}>
        <Box gridRow="2">
          <Typography className={s.end}>Игра окончена</Typography>
        </Box>
        <Zoom in={true}>
          <Box gridRow="3">
            <Typography className={s.count}>Набранные очки: 125</Typography>
          </Box>
        </Zoom>
      </Box>
    </Box>
  );
};
