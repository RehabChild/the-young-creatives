import type { Request, Response } from 'express';
import * as PortfolioModel from '../models/portfolioModel';
import { AppError } from '../middleware/errorHandler';

export async function getPortfolio(req: Request, res: Response) {
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;
  const projects = await PortfolioModel.listPortfolio(search);
  res.json({ projects });
}

export async function getPortfolioProject(req: Request, res: Response) {
  const id = Number(req.params.id);
  const project = await PortfolioModel.getPortfolioProject(id);
  if (!project) throw new AppError('Project not found.', 404);
  res.json({ project });
}

export async function postPortfolioProject(req: Request, res: Response) {
  const project = await PortfolioModel.createPortfolioProject(req.body);
  res.status(201).json({ project });
}

export async function putPortfolioProject(req: Request, res: Response) {
  const id = Number(req.params.id);
  const project = await PortfolioModel.updatePortfolioProject(id, req.body);
  if (!project) throw new AppError('Project not found.', 404);
  res.json({ project });
}

export async function removePortfolioProject(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await PortfolioModel.deletePortfolioProject(id);
  if (!deleted) throw new AppError('Project not found.', 404);
  res.status(204).send();
}
