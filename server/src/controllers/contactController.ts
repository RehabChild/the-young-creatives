import type { Request, Response } from 'express';
import * as ContactModel from '../models/contactModel';
import { AppError } from '../middleware/errorHandler';

export async function submitMessage(req: Request, res: Response) {
  const message = await ContactModel.createMessage(req.body);
  res.status(201).json({ message });
}

export async function getMessages(req: Request, res: Response) {
  const messages = await ContactModel.listMessages();
  res.json({ messages });
}

export async function patchMessageRead(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { isRead } = req.body as { isRead: boolean };
  const message = await ContactModel.markMessageRead(id, isRead);
  if (!message) throw new AppError('Message not found.', 404);
  res.json({ message });
}

export async function removeMessage(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await ContactModel.deleteMessage(id);
  if (!deleted) throw new AppError('Message not found.', 404);
  res.status(204).send();
}
