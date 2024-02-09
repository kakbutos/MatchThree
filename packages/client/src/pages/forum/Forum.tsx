import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './forum.module.scss';
import AustronautWithLaptop from '@/assets/images/austronaut-with-laptop.svg?react';
import LeftArrow from '@/assets/icons/arrow-left.svg?react';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRouteMain } from '@/constants/router/router';
import { Topic } from '@/widgets/topic/Topic';
import { ForumLayout } from '@/widgets/forum-layout/ForumLayout';
import { CreateThemeDialog } from '@/widgets/create-theme-dialog/CreateThemeDialog';
import { useApiCall } from '@/hooks/useApiCall';
import { forumApi } from '@/services/api/forum/forum-api';
import {
  SearchData,
  TopicResponse,
  isTopicArrayResponse,
} from '@/types/forum/api';

const sortByDate = (a: TopicResponse, b: TopicResponse) =>
  a.createdAt < b.createdAt ? 1 : -1;

export const Forum: React.FC = () => {
  const navigate = useNavigate();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [search, setSearch] = useState('');
  const [topicList, setTopicList] = useState<Array<TopicResponse> | undefined>(
    undefined
  );
  const [topics] = useApiCall(forumApi.getTopics);

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const goToMenu = () => {
    navigate(getRouteMain());
  };

  const fetchTopics = async (data?: SearchData) => {
    try {
      const res = await topics(data);
      if (isTopicArrayResponse(res)) {
        setTopicList(res.sort(sortByDate));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetSearch = () => {
    setSearch('');
    fetchTopics();
  };

  const handleSubmitSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      searchTitle: formData.get('searchTitle') as string,
    };
    fetchTopics(data);
  };

  useEffect(() => {
    fetchTopics();
  }, []);

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

      {topicList ? (
        <Box className={styles.listContainer}>
          <Box className={styles.filterContainer}>
            <form id="searchTopic" onSubmit={handleSubmitSearch}>
              <TextField
                name="searchTitle"
                id="searchTitle"
                label="Поиск"
                type="text"
                color="secondary"
                placeholder="Введите название темы..."
                size="small"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </form>
            <Box className={styles.actionGroup}>
              <Button
                form="searchTopic"
                type="submit"
                color="secondary"
                size="small">
                Поиск
              </Button>
              <Button
                onClick={handleResetSearch}
                form="searchTopic"
                type="submit"
                color="secondary"
                disabled={search.length === 0}
                size="small">
                Сбросить
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={handleOpenDialog}
                size="small">
                Создать тему
              </Button>
            </Box>
          </Box>
          {topicList.length > 0 ? (
            <>
              {topicList.map(topic => (
                <Topic key={topic.id} topic={topic} />
              ))}
              {/* <Box display="flex" justifyContent="center">
            <Button color="secondary" size="small" fullWidth={false}>
              Загрузить еще...
            </Button>
          </Box> */}
            </>
          ) : (
            <Typography component="span">Такой темы нет</Typography>
          )}
        </Box>
      ) : (
        <>
          <Typography component="span">
            Еще нет тем. Создайте первую тему для дискуссии.
          </Typography>
          <AustronautWithLaptop />
          <Button color="secondary" onClick={handleOpenDialog}>
            Создать тему
          </Button>
        </>
      )}
      <CreateThemeDialog
        fetchTopics={fetchTopics}
        open={isOpenDialog}
        onClose={handleCloseDialog}
      />
    </ForumLayout>
  );
};
