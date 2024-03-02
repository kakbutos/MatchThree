import s from './leaderboard.module.scss';
import { FC, useEffect, useState } from 'react';
import { Avatar, Badge, Box, Button, Typography, styled } from '@mui/material';
import LeftArrow from '@/assets/icons/arrow-left.svg?react';
import Crown from '@/assets/icons/crown.svg?react';
import TableRating from './TableRating';
import { ThemeButton } from '../theme-button/ThemeButton';
import { getRouteMain } from '@/constants/router/router';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '@/hooks/useApiCall';
import { leaderboardApi } from '@/services/api/leaderboard/leaderboard-api';
import {
  GetLeaderboardRequest,
  LeaderboardData,
  isGetLeaderboardResponse,
} from '@/types/leaderboard/leaderboard';
import { Spinner } from '@/shared/spinner/Spinner';
import { RATING_FIELD_NAME } from '@/constants';

const BackgroundDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '5vw',
  backgroundColor: theme.palette.background.default,
  position: 'relative',
}));

export const LeaderBoard: FC = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<LeaderboardData[]>([]);
  const [getLeaderboard, isLoading] = useApiCall(leaderboardApi.getLeaderboard);

  const onGetLeaderboard = async (data: GetLeaderboardRequest) => {
    const res = await getLeaderboard(data);

    if (isGetLeaderboardResponse(res)) {
      setData(
        res.map(item => ({
          userName: item.data.userName,
          score: item.data[RATING_FIELD_NAME],
          gameMode: item.data.gameMode,
          avatar: item.data.avatar,
        }))
      );
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 0:
        return '#FF0000';
      case 1:
        return '#ff8c00';
      case 2:
        return '#ff1493';
    }
  };

  const goToMenu = () => {
    navigate(getRouteMain());
  };

  useEffect(() => {
    onGetLeaderboard({
      ratingFieldName: RATING_FIELD_NAME,
      cursor: 0,
      limit: 10,
    } as GetLeaderboardRequest);
  }, []);

  return (
    <BackgroundDiv>
      <ThemeButton isAbsolutePosition />
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<LeftArrow />}
        onClick={goToMenu}
        className={s.linkBtn}>
        Меню
      </Button>
      <Typography fontSize={'2rem'} variant="h1">
        Доска лучших
      </Typography>
      {isLoading && <Spinner />}
      <Box className={s.avatarStack}>
        {data.slice(0, 3).map((player, i) => (
          <Box key={i}>
            <Badge badgeContent={i === 0 ? <Crown /> : i + 1}>
              <Avatar
                className={s.avatar}
                sx={{
                  backgroundColor: theme => theme.palette.primary.main,
                  boxShadow: `0 0 20px ${getPositionColor(i)}`,
                }}
                style={{ animationDelay: `${i}s` }}
                alt={player.userName}
                src={player.avatar}
              />
            </Badge>
            <Typography marginTop={2} textAlign={'center'}>
              {player.userName}
            </Typography>
            <Typography
              fontWeight={i === 0 ? 'bolder' : 'bold'}
              color={getPositionColor(i)}
              textAlign={'center'}>
              {player.score}
            </Typography>
          </Box>
        ))}
      </Box>

      <TableRating rows={data.slice(3)} />
    </BackgroundDiv>
  );
};
