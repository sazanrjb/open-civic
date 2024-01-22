import { z } from 'zod';

export const ChatResponseSchema = z.object({
  summary: z.string().optional(),
  name: z.string().optional(),
  about: z.string().optional(),
  info: z.array(z.object({
    location: z.string(),
    phone_number: z.string(),
  })).optional(),
  website: z.string().optional(),
  feedback: z.string().optional(),
});
