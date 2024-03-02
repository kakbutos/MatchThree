import { GamesImageList } from '@/widgets/main/image-list/ImageList';
import { Navbar } from '@/widgets/main/navbar/Navbar';
import { GameStepper } from '@/widgets/main/stepper/GameStepper';
import { Team } from '@/widgets/main/team/Team';
import { Box } from '@mui/material';
import { FC } from 'react';

export const MainPage: FC = () => {
  return (
    <Box sx={{ pb: 5 }}>
      <Navbar />
      <GamesImageList />
      <GameStepper />
      <Team />
    </Box>
  );
};
