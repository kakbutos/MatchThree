import type { Request, Response } from 'express';
import { Reply } from '../models/Reply';

export const createReply = async (req: Request, res: Response) => {
  try {
    const data = req.body as {
      content: string;
      commentId: number;
      userId: number;
    } & any;

    if (!data) {
      res.status(404).send('Empty body');
      return;
    }

    const comment = await Reply.create(data);

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
