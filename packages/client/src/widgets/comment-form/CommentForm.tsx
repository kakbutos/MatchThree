import { Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './comment-form.module.scss';
import { EmojiFormInputText } from '@/shared/form-fields/EmojiFormInputText';
import { ICreateComment } from '@/types/forum/create-comment';

export const CommentForm = () => {
  const { handleSubmit, control } = useForm<ICreateComment>({
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = (values: ICreateComment) => {
    console.log(values);
  };

  return (
    <>
      <Typography>Создать комментарий</Typography>
      <form className={styles.commentForm} onSubmit={handleSubmit(onSubmit)}>
        <EmojiFormInputText
          control={control}
          name="comment"
          label="Комментарий"
          color="secondary"
          placeholder="Введите комментарий..."
          multiline
          rows={3}
        />
        <div>
          <Button color="secondary" size="small" type="submit">
            Отправить
          </Button>
        </div>
      </form>
    </>
  );
};
