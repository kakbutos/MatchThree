import s from './leaderboard.module.scss';
import { FC, useMemo } from 'react';
import { Avatar, Badge, Box, Typography } from '@mui/material';
import Crown from '../../assets/icons/crown.svg?react';
import TableRating from './TableRating';
import { Player } from '@/types/player';

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

export const LeaderBoard: FC = () => {
  const data = useMemo(
    () => leaderboardData.sort((a, b) => b.score - a.score),
    [leaderboardData]
  );

  return (
    <Box className={s.wr}>
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
    </Box>
  );
};
