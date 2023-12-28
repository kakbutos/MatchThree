import { useAppDispatch } from '@/hooks/useAppDispatch';
import { GameStore } from '@/store/game';
import { GameStatus } from '@/types/game-status';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';

export const TimeBar = () => {
  const [progress, setProgress] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress > 100) {
          dispatch(GameStore.actions.changeStatus(GameStatus.OVER));
        }
        return oldProgress + 3.33; // 1% от 30с
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
};
