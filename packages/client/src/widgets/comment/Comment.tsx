import { Box, Typography, Button } from '@mui/material';
import Reply from '@/assets/icons/reply.svg?react';
import EmptyAvatarMan from '@/assets/images/empty-avatar-man.svg?react';
import styles from './comment.module.scss';
import { IComment } from '@/types/forum/comment';
import { ReplyCommentForm } from './ReplyCommentForm';

interface CommentProps {
  comment: IComment;
  openedId: string | null;
  onOpenReply: (id: string) => void;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  openedId,
  onOpenReply,
}) => (
  <>
    <Box className={styles.commentContainer}>
      <Box display="flex" gap="16px">
        <EmptyAvatarMan />
        <Box className={styles.commentInfo}>
          <Typography component="span">{comment.message}</Typography>
          <Typography component="span">{comment.author}</Typography>
        </Box>
      </Box>
      <Box className={styles.commentInfo} alignItems="end">
        <Typography component="span">{comment.created}</Typography>
        <Button
          variant="text"
          color="secondary"
          endIcon={<Reply />}
          onClick={() => onOpenReply(comment.id)}>
          Ответить
        </Button>
      </Box>
    </Box>
    {openedId === comment.id && <ReplyCommentForm commentId={comment.id} />}
  </>
);
