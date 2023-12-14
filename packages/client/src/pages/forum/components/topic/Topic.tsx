import { Box } from '@mui/material';
import CommentIcon from '@/assets/icons/comment.svg?react';
import { getRouteForumTopic } from '@/constants/router/router';
import { useNavigate } from 'react-router-dom';
import styles from './topic.module.scss';
import { ITopic } from '../../types/topic';

interface TopicProps {
  topic: ITopic;
}

export const Topic: React.FC<TopicProps> = ({ topic }) => {
  const navigate = useNavigate();

  const goToTopic = (id: string) => {
    navigate(getRouteForumTopic(id));
  };

  return (
    <Box
      key={topic.name}
      className={styles.themeContainer}
      onClick={() => goToTopic('id')}>
      <Box className={styles.themeInfoBlock}>
        <div>{topic.name}</div>
        <div>{topic.description}</div>
      </Box>
      <Box className={styles.themeInfoBlock}>
        <div>{topic.created}</div>
        <div className={styles.comment}>
          <CommentIcon />
          <div>{topic.commentCount}</div>
        </div>
      </Box>
    </Box>
  );
};
