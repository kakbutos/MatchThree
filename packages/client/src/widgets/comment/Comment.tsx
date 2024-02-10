import { Box, Typography, Button, Avatar } from '@mui/material';
import ReplyIcon from '@/assets/icons/reply.svg?react';
import EmptyAvatarMan from '@/assets/images/empty-avatar-man.svg?react';
import styles from './comment.module.scss';
import { ReplyCommentForm } from './ReplyCommentForm';
import { CommentResponse, ReplyResponse } from '@/types/forum/api';
import { FC, useMemo } from 'react';
import moment from 'moment';
import { User } from '@/types/user';
import { getResourceLink } from '@/constants';
import { Reply } from './Reply';

const sortByDate = (a: ReplyResponse, b: ReplyResponse) =>
  a.createdAt < b.createdAt ? 1 : -1;

interface CommentProps {
  comment: CommentResponse;
  openedId: string | null;
  onOpenReply: (id: string) => void;
  fetchTopic: () => void;
  users: Array<User | Record<string, string>>;
}

export const Comment: FC<CommentProps> = ({
  comment,
  openedId,
  onOpenReply,
  fetchTopic,
  users,
}) => {
  const commentUser = useMemo(
    () => users.find(user => user.id === comment.userId),
    [users, comment]
  );

  const sortedReplies = useMemo(
    () => comment.replies?.sort(sortByDate),
    [comment]
  );
  return (
    <>
      <Box className={styles.commentContainer}>
        <Box display="flex" gap="16px">
          {commentUser?.avatar ? (
            <Avatar alt="avatar" src={getResourceLink(commentUser?.avatar)} />
          ) : (
            <EmptyAvatarMan width={40} />
          )}
          <Box className={styles.commentInfo}>
            <Typography component="span">{commentUser?.first_name}</Typography>
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
      {sortedReplies.map(reply => (
        <Reply users={users} key={reply.id} reply={reply} />
      ))}
    </>
  );
};
