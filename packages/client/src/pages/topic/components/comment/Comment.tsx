import { Box, Typography, Button, TextField } from '@mui/material';
import Reply from '@/assets/icons/reply.svg?react';
import EmptyAvatarMan from '@/assets/images/empty-avatar-man.svg?react';
import styles from './comment.module.scss';
import { IComment } from '../../types/comment';

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
    {openedId === comment.id && (
      <Box display="flex" gap="16px" alignItems="center">
        <TextField
          name="comment"
          id="comment"
          label="Комментарий"
          color="secondary"
          placeholder="Введите комментарий..."
          size="small"
        />
        <div>
          <Button color="secondary" size="small">
            Отправить
          </Button>
        </div>
      </Box>
    )}
  </>
);
