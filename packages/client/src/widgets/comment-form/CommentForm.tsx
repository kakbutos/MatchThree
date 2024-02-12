import { Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './comment-form.module.scss';
import { EmojiFormInputText } from '@/shared/form-fields/EmojiFormInputText';
import { ICreateComment } from '@/types/forum/create-comment';
import { useApiCall } from '@/hooks/useApiCall';
import { forumApi } from '@/services/api/forum/forum-api';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { UserStore } from '@/store/user';
import { isCommentResponse } from '@/types/forum/api';

interface CommentFormProps {
  fetchTopic: () => void;
}

export const CommentForm = ({ fetchTopic }: CommentFormProps) => {
  const { handleSubmit, control, reset } = useForm<ICreateComment>({
    defaultValues: {
      content: '',
    },
  });

  const [createComment] = useApiCall(forumApi.createComment);

  const authUser = useAppSelector(UserStore.selectors.selectCurrentUser);

  const { id } = useParams();

  const onSubmit = async (values: ICreateComment) => {
    try {
      const data = {
        ...values,
        topicId: id as string,
        userId: authUser.id as string,
      };

      const res = await createComment(data);
      if (isCommentResponse(res)) {
        reset({
          content: '',
        });
        fetchTopic();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography>Создать комментарий</Typography>
      <form className={styles.commentForm} onSubmit={handleSubmit(onSubmit)}>
        <EmojiFormInputText
          control={control}
          name="content"
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
