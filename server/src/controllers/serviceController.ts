import type { Request, Response } from 'express';
import * as ServiceModel from '../models/serviceModel';
import { AppError } from '../middleware/errorHandler';

export async function getServices(_req: Request, res: Response) {
  const services = await ServiceModel.listServices();
  res.json({ services });
}

export async function postService(req: Request, res: Response) {
  const service = await ServiceModel.createService(req.body);
  res.status(201).json({ service });
}

export async function putService(req: Request, res: Response) {
  const id = Number(req.params.id);
  const service = await ServiceModel.updateService(id, req.body);
  if (!service) throw new AppError('Service not found.', 404);
  res.json({ service });
}

export async function removeService(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await ServiceModel.deleteService(id);
  if (!deleted) throw new AppError('Service not found.', 404);
  res.status(204).send();
}
