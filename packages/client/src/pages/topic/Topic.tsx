import { Box, Button, Typography } from '@mui/material';
import styles from './topic.module.scss';
import LeftArrow from '@/assets/icons/arrow-left.svg?react';
import { mockCommentList } from './comment-list.mock';
import { useState } from 'react';
import { getRouteForum } from '@/constants/router/router';
import { useNavigate } from 'react-router-dom';
import { CommentForm } from './components/comment-form/CommentForm';
import { Comment } from './components/comment/Comment';
import { ForumLayout } from '@/widgets/forum-layout/ForumLayout';

export const TopicPage: React.FC = () => {
  const navigate = useNavigate();
  const [openedId, setOpenedId] = useState<string | null>(null);
  const comments = mockCommentList;

  const goToList = () => {
    navigate(getRouteForum());
  };

  return (
    <ForumLayout>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<LeftArrow />}
        onClick={goToList}
        className={styles.linkBtn}>
        Список тем
      </Button>
      <Box className={styles.container}>
        <Box mb={1} display="flex" gap="8px" flexDirection="column">
          <Typography component="h2" variant="h5">
            Тема
          </Typography>
          <Typography>Описание</Typography>
          <Typography>15:00 12.12.2021</Typography>
        </Box>
        <Box>
          {comments.map(comment => (
            <Comment
              comment={comment}
              key={comment.id}
              onOpenReply={setOpenedId}
              openedId={openedId}
            />
          ))}
        </Box>
      </Box>
      <Box className={styles.container}>
        <CommentForm />
      </Box>
    </ForumLayout>
  );
};
