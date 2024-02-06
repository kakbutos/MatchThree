import type { Request, Response } from 'express';
import { Comment } from '../models/Comment';
import { getRepliesById } from './ReplyController';

// export const getAllCommentByTopicId = async(req: Request, res: Response) => {
//   try {
//     const id = req.params.id;
//     if (!id) {
//       res.status(404).send('Id not found');
//       return;
//     }
//
//     const comments = await Comment.findAll({
//       where: {
//         id
//       },
//     });
//
//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).send('Internal Server Error');
//   }
// };

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

    // Получаем все комментарии для указанного топика
    const comments = await Comment.findAll({
      where: {
        topicId: +topicId,
      },
    });

    // Для каждого комментария получаем все ответы
    const commentsWithReplies = await getRepliesById(comments);

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
