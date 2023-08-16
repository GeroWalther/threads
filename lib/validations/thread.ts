import * as z from 'zod';

export const ThreadValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: 'Must be at least 3 characters long.' }),
  accountId: z.string(),
});
export const CommentValidation = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: 'Must be at least 3 characters long.' }),
});
