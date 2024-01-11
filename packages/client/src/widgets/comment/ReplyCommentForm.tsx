import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ICreateComment } from '@/types/forum/create-comment';
import { EmojiFormInputText } from '@/shared/form-fields/EmojiFormInputText';

interface ReplyCommentFormProps {
  commentId: string;
}

export const ReplyCommentForm: React.FC<ReplyCommentFormProps> = ({
  commentId,
}) => {
  const { handleSubmit, control } = useForm<ICreateComment>({
    defaultValues: {
      comment: '',
    },
  });

  const onSubmit = (values: ICreateComment) => {
    console.log({ ...values, commentId });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" gap="16px" alignItems="baseline">
          <EmojiFormInputText
            control={control}
            name="comment"
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
