import { Box, Typography, Avatar } from '@mui/material';
import EmptyAvatarMan from '@/assets/images/empty-avatar-man.svg?react';
import styles from './comment.module.scss';
import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { useApiCall } from '@/hooks/useApiCall';
import { userApi } from '@/services/api/user/user-api';
import { User, isUserResponse } from '@/types/user';
import { getResourceLink } from '@/constants';
import { ReplyResponse } from '@/types/forum/api';

interface ReplyProps {
  reply: ReplyResponse;
}

export const Reply: FC<ReplyProps> = ({ reply }) => {
  const [userById, setUserById] = useState<User | Record<string, string>>({});
  const [getUserApi] = useApiCall(userApi.getUser);

  const getUserById = async () => {
    if (reply.userId) {
      const res = await getUserApi(+reply.userId);

      if (isUserResponse(res)) {
        setUserById(res);
      }
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  return (
    <>
      <Box className={styles.replyContainer}>
        <Box display="flex" gap="6px">
          {userById?.avatar ? (
            <Avatar
              style={{ width: '25px', height: '25px' }}
              alt="avatar"
              src={getResourceLink(userById?.avatar)}
            />
          ) : (
            <EmptyAvatarMan width={25} />
          )}
          <Box className={styles.commentInfo}>
            <Typography component="span">{userById.first_name}</Typography>
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
