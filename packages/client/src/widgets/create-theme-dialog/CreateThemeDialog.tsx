import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Button,
} from '@mui/material';
import { FormEvent } from 'react';
import styles from './crate-theme-dialog.module.scss';
import { useApiCall } from '@/hooks/useApiCall';
import { forumApi } from '@/services/api/forum/forum-api';
import { useAppSelector } from '@/hooks/useAppSelector';
import { UserStore } from '@/store/user';
import { isTopicResponse } from '@/types/forum/api';

export interface CreateThemeRequest {
  name: string;
  description: string;
}

interface CreateThemeDialogProps {
  open: boolean;
  onClose: (value?: CreateThemeRequest) => void;
}

export const CreateThemeDialog: React.FC<CreateThemeDialogProps> = ({
  open,
  onClose,
}) => {
  const [createTopic] = useApiCall(forumApi.createTopic);
  const authUser = useAppSelector(UserStore.selectors.selectCurrentUser);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      userId: authUser.id as number,
    };
    try {
      const res = await createTopic(data);
      if (isTopicResponse(res)) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Создание темы</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            id="name"
            label="Наименование"
            name="title"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            id="description"
            label="Описание"
            name="description"
            multiline
            rows={2}
            autoFocus
          />
          <Box className={styles.actionGroup}>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Отмена
            </Button>
            <Button color="secondary" type="submit">
              Создать
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
