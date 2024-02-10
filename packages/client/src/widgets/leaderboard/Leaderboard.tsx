import s from './leaderboard.module.scss';
import { FC, useMemo } from 'react';
import { Avatar, Badge, Box, Button, Typography, styled } from '@mui/material';
import LeftArrow from '@/assets/icons/arrow-left.svg?react';
import Crown from '@/assets/icons/crown.svg?react';
import TableRating from './TableRating';
import { Player } from '@/types/player';
import { ThemeButton } from '../theme-button/ThemeButton';
import { getRouteMain } from '@/constants/router/router';
import { useNavigate } from 'react-router-dom';

const leaderboardData: Player[] = [
  { name: 'Player 2', score: 90, avatar: '' },
  { name: 'Player 1', score: 100, avatar: '' },
  { name: 'Player 3', score: 80, avatar: '' },
  { name: 'Player 4', score: 150, avatar: '' },
  { name: 'Player 5', score: 20, avatar: '' },
  { name: 'Player 6', score: 0, avatar: '' },
  { name: 'Player 7', score: 40, avatar: '' },
  { name: 'Player 8', score: 40, avatar: '' },
  { name: 'Player 9', score: 20, avatar: '' },
  { name: 'Player 10', score: 40, avatar: '' },
];

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
  const data = useMemo(
    () => leaderboardData.sort((a, b) => b.score - a.score),
    [leaderboardData]
  );

  const goToMenu = () => {
    navigate(getRouteMain());
  };

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
      <Box className={s.avatarStack}>
        {data.slice(0, 3).map((player, i) => (
          <Box key={i}>
            <Badge badgeContent={i === 0 ? <Crown /> : i + 1}>
              <Avatar
                className={s.avatar}
                sx={{
                  backgroundColor: theme => theme.palette.primary.main,
                }}
                style={{ animationDelay: `${i}s` }}
                alt={player.name}
                src={player.avatar}
              />
            </Badge>
            <Typography textAlign={'center'}>{player.name}</Typography>
          </Box>
        ))}
      </Box>

      <TableRating rows={data.slice(3)} />
    </BackgroundDiv>
  );
};
