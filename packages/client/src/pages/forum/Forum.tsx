import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './forum.module.scss';
import AustronautWithLaptop from '@/assets/images/austronaut-with-laptop.svg?react';
import LeftArrow from '@/assets/icons/arrow-left.svg?react';
import { useState } from 'react';
import { mockThemeList } from './theme-list.mock';
import { useNavigate } from 'react-router-dom';
import { getRouteMain } from '@/constants/router/router';
import { Topic } from '@/widgets/topic/Topic';
import { ForumLayout } from '@/widgets/forum-layout/ForumLayout';
import {
  CreateThemeDialog,
  CreateThemeRequest,
} from '@/widgets/create-theme-dialog/CreateThemeDialog';
import { ITopic } from '@/types/forum/topic';

export const Forum: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = (value?: CreateThemeRequest) => {
    // TODO добавить запрос на создание топика
    console.log(value);
    setIsOpenDialog(false);
  };

  const goToMenu = () => {
    navigate(getRouteMain());
  };

  const themeList: ITopic[] = mockThemeList;

  return (
    <ForumLayout>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<LeftArrow />}
        onClick={goToMenu}
        className={styles.linkBtn}>
        Меню
      </Button>
      {themeList.length === 0 ? (
        <>
          <Typography component="span">
            Еще нет тем. Создайте первую тему для дискуссии.
          </Typography>
          <AustronautWithLaptop />
          <Button color="secondary" onClick={handleOpenDialog}>
            Создать тему
          </Button>
        </>
      ) : (
        <Box className={styles.listContainer}>
          <Box className={styles.filterContainer}>
            <TextField
              name="name"
              id="name"
              label="Поиск"
              color="secondary"
              placeholder="Введите название темы..."
              size="small"
            />
            <div>
              <Box className={styles.actionGroup}>
                <Button color="secondary" size="small">
                  Поиск
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleOpenDialog}
                  size="small">
                  Создать тему
                </Button>
              </Box>
            </div>
          </Box>
          {themeList.map(topic => (
            <Topic key={topic.name} topic={topic} />
          ))}
          <Box display="flex" justifyContent="center">
            <Button color="secondary" size="small" fullWidth={false}>
              Загрузить еще...
            </Button>
          </Box>
        </Box>
      )}
      <CreateThemeDialog open={isOpenDialog} onClose={handleCloseDialog} />
    </ForumLayout>
  );
};
