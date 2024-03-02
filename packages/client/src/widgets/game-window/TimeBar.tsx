import { useApiCall } from '@/hooks/useApiCall';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { leaderboardApi } from '@/services/api/leaderboard/leaderboard-api';
import { GameStore } from '@/store/game';
import { UserStore } from '@/store/user';
import { GameStatus } from '@/types/game-status';
import {
  LeaderboardData,
  UpdateLeaderboardRequest,
} from '@/types/leaderboard/leaderboard';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';
import { RATING_FIELD_NAME, TEAM_NAME, getResourceLink } from '@/constants';

const gameSeconds = 120;
const maxPercents = 100;
const percentOfGameSeconds = maxPercents / gameSeconds;

interface TimeBarProps {
  endGameHandler: () => number;
}

export const TimeBar: React.FC<TimeBarProps> = ({ endGameHandler }) => {
  const [progress, setProgress] = useState(0);
  const dispatch = useAppDispatch();
  const [updateLeaderboard] = useApiCall(leaderboardApi.updateLeaderboard);
  const currentUser = useAppSelector(UserStore.selectors.selectCurrentUser);

  const onUpdateLeaderboard = async (data: UpdateLeaderboardRequest) => {
    return await updateLeaderboard(data);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress > maxPercents) {
          onUpdateLeaderboard({
            data: {
              userName: currentUser.display_name,
              [RATING_FIELD_NAME]: endGameHandler(),
              gameMode: 'timeAttack',
              avatar: currentUser?.avatar
                ? getResourceLink(currentUser?.avatar)
                : '',
            } as LeaderboardData,
            ratingFieldName: RATING_FIELD_NAME,
            teamName: TEAM_NAME,
          });

          dispatch(GameStore.actions.changeStatus(GameStatus.OVER));
        }
        return oldProgress + percentOfGameSeconds;
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
