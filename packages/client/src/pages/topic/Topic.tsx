import { Box, Button, Typography } from '@mui/material';
import styles from './topic.module.scss';
import LeftArrow from '@/assets/icons/arrow-left.svg?react';
import { FC, useEffect, useState } from 'react';
import { getRouteForum } from '@/constants/router/router';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentForm } from '@/widgets/comment-form/CommentForm';
import { Comment } from '@/widgets/comment/Comment';
import { ForumLayout } from '@/widgets/forum-layout/ForumLayout';
import { useApiCall } from '@/hooks/useApiCall';
import { forumApi } from '@/services/api/forum/forum-api';
import {
  CommentResponse,
  TopicWithComments,
  isCommentArrayResponse,
  isTopicResponse,
} from '@/types/forum/api';
import moment from 'moment';

const sortByDate = (a: CommentResponse, b: CommentResponse) =>
  a.createdAt < b.createdAt ? 1 : -1;

export const TopicPage: FC = () => {
  const navigate = useNavigate();
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [topic, setTopic] = useState<TopicWithComments | null>(null);
  const { id } = useParams();

  const [getTopic] = useApiCall(forumApi.getTopicById);
  const [getComments] = useApiCall(forumApi.getComments);

  const goToList = () => {
    navigate(getRouteForum());
  };

  const fetchTopic = async () => {
    try {
      const res = await getTopic(id as string);
      const comments = await getComments({ topicId: id as string });
      if (isTopicResponse(res) && isCommentArrayResponse(comments)) {
        setTopic({ ...res, comments: comments.sort(sortByDate) });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, []);

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
      {topic && (
        <>
          <Box className={styles.container}>
            <Box mb={1} display="flex" gap="8px" flexDirection="column">
              <Typography component="h2" variant="h5">
                {topic.title}
              </Typography>
              <Typography>{topic.description}</Typography>
              <Typography>{`${moment(topic.createdAt).format(
                'll'
              )}`}</Typography>
            </Box>
            <Box>
              {topic.comments.map(comment => (
                <Comment
                  fetchTopic={fetchTopic}
                  comment={comment}
                  key={comment.id}
                  onOpenReply={setOpenedId}
                  openedId={openedId}
                />
              ))}
            </Box>
          </Box>
          <Box className={styles.container}>
            <CommentForm fetchTopic={fetchTopic} />
          </Box>
        </>
      )}
    </ForumLayout>
  );
};
