import { Box, Typography, Avatar } from '@mui/material';
import EmptyAvatarMan from '@/assets/images/empty-avatar-man.svg?react';
import styles from './comment.module.scss';
import { FC, useMemo } from 'react';
import moment from 'moment';
import { User } from '@/types/user';
import { getResourceLink } from '@/constants';
import { ReplyResponse } from '@/types/forum/api';

interface ReplyProps {
  reply: ReplyResponse;
  users: Array<User | Record<string, string>>;
}

export const Reply: FC<ReplyProps> = ({ reply, users }) => {
  const replyUser = useMemo(
    () => users.find(user => user.id === reply.userId),
    [reply, users]
  );

  return (
    <>
      <Box className={styles.replyContainer}>
        <Box display="flex" gap="6px">
          {replyUser?.avatar ? (
            <Avatar alt="avatar" src={getResourceLink(replyUser?.avatar)} />
          ) : (
            <EmptyAvatarMan width={25} />
          )}
          <Box className={styles.commentInfo}>
            <Typography component="span">{replyUser?.first_name}</Typography>
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
