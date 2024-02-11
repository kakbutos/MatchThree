import { Avatar, Box, Typography } from '@mui/material';
import styles from './comment.module.scss';
import { FC } from 'react';
import moment from 'moment';
import { ReplyResponse } from '@/types/forum/api';

interface ReplyProps {
  reply: ReplyResponse;
}

export const Reply: FC<ReplyProps> = ({ reply }) => {
  return (
    <>
      <Box className={styles.replyContainer}>
        <Box display="flex" gap="6px">
          <Avatar
            alt="avatar"
            src={`https://ui-avatars.com/api/?name=${reply.userId}`}
          />
          <Box className={styles.commentInfo}>
            <Typography component="span">
              Пользователь {reply.userId}
            </Typography>
            <Typography component="span">{reply.content}</Typography>
          </Box>
        </Box>
        <Box className={styles.commentInfo} alignItems="end">
          <Typography component="span">{`${moment(reply.createdAt).format(
            'MMM Do YY, h:mm a'
          )}`}</Typography>
        </Box>
      </Box>
    </>
  );
};
