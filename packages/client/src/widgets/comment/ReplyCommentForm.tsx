import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ICreateComment } from '@/types/forum/create-comment';
import { EmojiFormInputText } from '@/shared/form-fields/EmojiFormInputText';
import { useApiCall } from '@/hooks/useApiCall';
import { forumApi } from '@/services/api/forum/forum-api';
import { UserStore } from '@/store/user';
import { useAppSelector } from '@/hooks/useAppSelector';
import { isReplyResponse } from '@/types/forum/api';

interface ReplyCommentFormProps {
  commentId: string;
  fetchTopic: () => void;
}

export const ReplyCommentForm: React.FC<ReplyCommentFormProps> = ({
  commentId,
  fetchTopic,
}) => {
  const { handleSubmit, control, reset } = useForm<ICreateComment>({
    defaultValues: {
      content: '',
    },
  });

  const authUser = useAppSelector(UserStore.selectors.selectCurrentUser);
  const [sendReply] = useApiCall(forumApi.sendReply);

  const onSubmit = async (values: ICreateComment) => {
    try {
      const data = {
        ...values,
        commentId: commentId as string,
        userId: authUser.id as string,
      };

      const res = await sendReply(data);
      if (isReplyResponse(res)) {
        reset({ content: '' });
        fetchTopic();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap="16px" alignItems="baseline">
          <EmojiFormInputText
            control={control}
            name="content"
            label="Комментарий"
            color="secondary"
            placeholder="Введите комментарий..."
            size="small"
          />
          <div>
            <Button color="secondary" size="small" type="submit">
              Отправить
            </Button>
          </div>
        </Box>
      </form>
    </>
  );
};
