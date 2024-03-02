import express from 'express';
import { createTopic, getAllTopicList, getTopicById } from './TopicController';
import {
  createComment,
  getAllCommentsWithRepliesByTopicId,
} from './CommentController';
import { createReply } from './ReplyController';
import { changeTheme, getThemeByUserId } from './UserThemeController';

export const initControllers = () => {
  const router = express.Router();

  router.get('/api/topic', getAllTopicList);
  router.get('/api/topic/:id', getTopicById);
  router.post('/api/topic', createTopic);

  router.get('/api/comment', getAllCommentsWithRepliesByTopicId);
  router.post('/api/comment', createComment);

  router.get('/api/theme/:userId', getThemeByUserId);
  router.post('/api/theme', changeTheme);

  router.post('/api/reply', createReply);

  return router;
};
