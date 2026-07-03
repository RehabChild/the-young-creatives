import type { Request, Response } from 'express';
import * as TestimonialModel from '../models/testimonialModel';
import { AppError } from '../middleware/errorHandler';

export async function getTestimonials(_req: Request, res: Response) {
  const testimonials = await TestimonialModel.listTestimonials(true);
  res.json({ testimonials });
}

export async function getAllTestimonialsAdmin(_req: Request, res: Response) {
  const testimonials = await TestimonialModel.listTestimonials(false);
  res.json({ testimonials });
}

export async function postTestimonial(req: Request, res: Response) {
  const testimonial = await TestimonialModel.createTestimonial(req.body);
  res.status(201).json({ testimonial });
}

export async function putTestimonial(req: Request, res: Response) {
  const id = Number(req.params.id);
  const testimonial = await TestimonialModel.updateTestimonial(id, req.body);
  if (!testimonial) throw new AppError('Testimonial not found.', 404);
  res.json({ testimonial });
}

export async function removeTestimonial(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await TestimonialModel.deleteTestimonial(id);
  if (!deleted) throw new AppError('Testimonial not found.', 404);
  res.status(204).send();
}
