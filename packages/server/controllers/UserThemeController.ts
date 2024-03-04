import type { Request, Response } from 'express';
import { UserTheme } from '../models/UserTheme';

export const getThemeByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      res.status(404).send('User id not found');
      return;
    }

    const theme = await UserTheme.findOne({
      where: {
        userId: +userId,
      },
    });

    res.status(200).json(theme);
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const changeTheme = async (req: Request, res: Response) => {
  try {
    const data = req.body as {
      theme: string;
      userId: number;
      userThemeId: number;
    } & any;

    if (!data) {
      res.status(404).send('Empty body');
      return;
    }

    await UserTheme.update(data, {
      where: {
        userId: +data.userId,
      },
    });

    res.status(200).send('OK');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

export const createTheme = async (req: Request, res: Response) => {
  try {
    const data = req.body as {
      theme: string;
      userId: number;
      id: number;
    } & any;

    if (!data) {
      res.status(404).send('Empty body');
      return;
    }

    const created = await UserTheme.create(data);

    res.status(200).json(created);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
