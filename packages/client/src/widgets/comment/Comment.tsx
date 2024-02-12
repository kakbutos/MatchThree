import { Box, Typography, Button, Avatar } from '@mui/material';
import ReplyIcon from '@/assets/icons/reply.svg?react';
import styles from './comment.module.scss';
import { ReplyCommentForm } from './ReplyCommentForm';
import { CommentResponse, ReplyResponse } from '@/types/forum/api';
import { FC, useMemo } from 'react';
import moment from 'moment';
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
  const sortedReplies = useMemo(
    () => comment.replies?.sort(sortByDate),
    [comment]
  );
  return (
    <>
      <Box className={styles.commentContainer}>
        <Box display="flex" gap="16px">
          <Avatar
            alt="avatar"
            src={`https://ui-avatars.com/api/?name=${comment.userId}`}
          />
          <Box className={styles.commentInfo}>
            <Typography component="span">
              Пользователь {comment.userId}
            </Typography>
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
        <Reply key={reply.id} reply={reply} />
      ))}
    </>
  );
};
