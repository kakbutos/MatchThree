import { Box, Typography, Button, Avatar } from '@mui/material';
import ReplyIcon from '@/assets/icons/reply.svg?react';
import EmptyAvatarMan from '@/assets/images/empty-avatar-man.svg?react';
import styles from './comment.module.scss';
import { ReplyCommentForm } from './ReplyCommentForm';
import { CommentResponse, ReplyResponse } from '@/types/forum/api';
import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { useApiCall } from '@/hooks/useApiCall';
import { userApi } from '@/services/api/user/user-api';
import { User, isUserResponse } from '@/types/user';
import { getResourceLink } from '@/constants';
import { Reply } from './Reply';

const sortByDate = (a: ReplyResponse, b: ReplyResponse) =>
  a.createdAt < b.createdAt ? 1 : -1;

interface CommentProps {
  comment: CommentResponse;
  openedId: string | null;
  onOpenReply: (id: string) => void;
  fetchTopic: () => void;
}

export const Comment: FC<CommentProps> = ({
  comment,
  openedId,
  onOpenReply,
  fetchTopic,
}) => {
  const [userById, setUserById] = useState<User | Record<string, string>>({});

  const [getUserApi] = useApiCall(userApi.getUser);

  const getUserById = async () => {
    if (comment.userId) {
      const res = await getUserApi(+comment.userId);

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
      <Box className={styles.commentContainer}>
        <Box display="flex" gap="16px">
          {userById?.avatar ? (
            <Avatar alt="avatar" src={getResourceLink(userById?.avatar)} />
          ) : (
            <EmptyAvatarMan width={40} />
          )}
          <Box className={styles.commentInfo}>
            <Typography component="span">{userById.first_name}</Typography>
            <Typography component="span">{comment.content}</Typography>
          </Box>
        </Box>
        <Box className={styles.commentInfo} alignItems="end">
          <Typography component="span">{`${moment(comment.createdAt).format(
            'MMM Do YY, h:mm a'
          )}`}</Typography>
          <Button
            variant="text"
            color="secondary"
            endIcon={<ReplyIcon />}
            onClick={() => onOpenReply(comment.id)}>
            Ответить
          </Button>
        </Box>
      </Box>
      {openedId === comment.id && (
        <ReplyCommentForm fetchTopic={fetchTopic} commentId={comment.id} />
      )}
      {comment.replies?.sort(sortByDate).map(reply => (
        <Reply key={reply.id} reply={reply} />
      ))}
    </>
  );
};
