import { Request, Response } from 'express';
import * as recordService from '../services/recordService';


declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      username: string;
    };
  }
}

export const getRecords = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  try {
    const records = await recordService.getAllRecordsByUserId(userId);
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred', error: (error as Error).message });
  }
};

export const addRecord = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const newRecord = { ...req.body, user_id: userId };
  try {
    const record = await recordService.createRecord(newRecord);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred', error: (error as Error).message });
  }
};

export const editRecord = async (req: Request, res: Response) => {
  try {
    const record = await recordService.updateRecordById(req.params.id, req.body);
    if (record) res.json(record);
    else res.status(404).send('Record not found');
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred', error:(error as Error).message });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const success = await recordService.deleteRecordById(req.params.id);
    if (success) res.status(204).send();
    else res.status(404).send('Record not found');
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred', error: (error as Error).message });
  }
};
