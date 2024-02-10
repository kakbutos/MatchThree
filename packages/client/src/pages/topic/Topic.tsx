import { Box, Button, Typography } from '@mui/material';
import styles from './topic.module.scss';
import LeftArrow from '@/assets/icons/arrow-left.svg?react';
import { FC, useCallback, useEffect, useState } from 'react';
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
import { userApi } from '@/services/api/user/user-api';
import { User, isUserResponse } from '@/types/user';

const sortByDate = (a: CommentResponse, b: CommentResponse) =>
  a.createdAt < b.createdAt ? 1 : -1;

const getUniqueUsersId = (comments: Array<CommentResponse>) => {
  const commentUsers: Set<number> = new Set();
  comments.forEach(comment => {
    commentUsers.add(comment.userId);
    comment.replies.forEach(reply => commentUsers.add(+reply.userId));
  });
  return commentUsers;
};

export const TopicPage: FC = () => {
  const navigate = useNavigate();
  const [openedId, setOpenedId] = useState<string | null>(null);
  const [topic, setTopic] = useState<TopicWithComments | null>(null);
  const [usersById, setUsersById] = useState<
    Array<User | Record<string, string>>
  >([]);

  const { id } = useParams();

  const [getTopic] = useApiCall(forumApi.getTopicById);
  const [getComments] = useApiCall(forumApi.getComments);
  const [getUserApi] = useApiCall(userApi.getUser);

  const goToList = () => {
    navigate(getRouteForum());
  };

  const getUserById = async (userId: number) => {
    const res = await getUserApi(userId);

    if (isUserResponse(res)) {
      setUsersById([...usersById, res]);
    }
  };

  const fetchTopic = useCallback(async () => {
    try {
      const res = await getTopic(id as string);
      const comments = await getComments({ topicId: id as string });
      if (isTopicResponse(res) && isCommentArrayResponse(comments)) {
        setTopic({ ...res, comments: comments.sort(sortByDate) });
        const commentUsers = getUniqueUsersId(comments);
        commentUsers.forEach(user => getUserById(user));
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

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
                  users={usersById}
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
