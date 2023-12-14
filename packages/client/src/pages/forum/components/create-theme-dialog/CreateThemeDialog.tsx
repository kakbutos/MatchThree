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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onClose({
      name: data.get('name') as string,
      description: data.get('description') as string,
    });
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
            name="name"
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
