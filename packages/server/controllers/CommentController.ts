import type { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { Reply } from '../models/Reply';

export const getAllCommentsWithRepliesByTopicId = async (
  req: Request,
  res: Response
) => {
  try {
    const topicId = req.query.topicId;
    if (!topicId) {
      res.status(404).send('Topic id not found');
      return;
    }

    // Получаем все комментарии для указанного топика вместе с ответами
    const commentsWithReplies = await Comment.findAll({
      where: {
        topicId: +topicId,
      },
      include: {
        model: Reply,
        as: 'replies',
      },
    });

    res.status(200).json(commentsWithReplies);
  } catch (error) {
    console.error('Error fetching comments with replies:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const data = req.body as {
      content: string;
      topicId: number;
      userId: number;
    } & any;

    if (!data) {
      res.status(404).send('Empty body');
      return;
    }

    const comment = await Comment.create(data);

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
