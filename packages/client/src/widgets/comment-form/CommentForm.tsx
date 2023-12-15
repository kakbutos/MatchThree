import { Typography, TextField, Button } from '@mui/material';
import styles from './comment-form.module.scss';

export const CommentForm = () => (
  <>
    <Typography>Создать комментарий</Typography>
    <form className={styles.commentForm}>
      <TextField
        name="comment"
        id="comment"
        label="Комментарий"
        color="secondary"
        placeholder="Введите комментарий..."
        multiline
        rows={3}
      />
      <div>
        <Button color="secondary" size="small">
          Отправить
        </Button>
      </div>
    </form>
  </>
);
