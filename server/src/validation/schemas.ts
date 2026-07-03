import { z } from 'zod';

export const bookingSchema = z.object({
  companyName: z.string().trim().min(1, 'Company name is required.'),
  contactPerson: z.string().trim().min(1, 'Contact person is required.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().min(6, 'Enter a valid phone number.'),
  serviceNeeded: z.string().trim().min(1, 'Service needed is required.'),
  projectDescription: z.string().trim().min(20, 'Project description should be at least 20 characters.'),
  budgetRange: z.string().trim().min(1, 'Budget range is required.'),
  preferredDate: z.string().trim().min(1, 'Preferred meeting date is required.'),
});

export const bookingStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'in_progress', 'closed']),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z.string().trim().email('Enter a valid email address.'),
  message: z.string().trim().min(10, 'Message should be at least 10 characters.'),
});

export const messageReadSchema = z.object({
  isRead: z.boolean(),
});

export const serviceSchema = z.object({
  sortOrder: z.number().int().optional(),
  name: z.string().trim().min(1, 'Name is required.'),
  summary: z.string().trim().min(1, 'Summary is required.'),
  detail: z.string().trim().min(1, 'Detail is required.'),
  deliverables: z.array(z.string().trim().min(1)).default([]),
});

export const portfolioSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  category: z.string().trim().min(1, 'Category is required.'),
  description: z.string().trim().min(1, 'Description is required.'),
  tech: z.array(z.string().trim().min(1)).default([]),
  color: z.string().trim().optional(),
  imageUrl: z.string().trim().url().nullable().optional(),
  sortOrder: z.number().int().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  company: z.string().trim().min(1, 'Company is required.'),
  quote: z.string().trim().min(1, 'Quote is required.'),
  rating: z.number().int().min(1).max(5),
  isPublished: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});
