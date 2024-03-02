import { Box } from '@mui/material';
import CommentIcon from '@/assets/icons/comment.svg?react';
import { getRouteForumTopic } from '@/constants/router/router';
import { useNavigate } from 'react-router-dom';
import styles from './topic.module.scss';
import { TopicResponse } from '@/types/forum/api';
import moment from 'moment';

interface TopicProps {
  topic: TopicResponse;
}

export const Topic: React.FC<TopicProps> = ({ topic }) => {
  const navigate = useNavigate();

  const goToTopic = (id: string) => {
    navigate(getRouteForumTopic(id));
  };

  return (
    <Box
      key={topic.title}
      className={styles.themeContainer}
      onClick={() => goToTopic(`${topic.id}`)}>
      <Box className={styles.themeInfoBlock}>
        <div>{topic.title}</div>
        <div>{topic.description}</div>
      </Box>
      <Box className={styles.themeInfoBlock}>
        <div>{`${moment(topic.createdAt).format('l')}`}</div>
        <div className={styles.comment}>
          <CommentIcon />
          {/* <div>{topic.commentCount}</div> */}
        </div>
      </Box>
    </Box>
  );
};
