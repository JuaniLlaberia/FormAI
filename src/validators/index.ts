import { z } from 'zod';

export const FormValidator = z.object({
  name: z.string().min(1, 'Must have a name'),
  description: z.string().min(1, 'Must have a name'),
  type: z.enum(['scratch', 'templates']),
});
