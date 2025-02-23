import { z, ZodError } from 'zod';
import { ValidationError } from '../errors/index.js';

export const validateSchema = (
  schema: z.ZodType<unknown>,
  data: unknown,
  type: string,
) => {
  try {
    schema.parse(data);
  } catch (error: unknown) {
    const msg = error instanceof ZodError ? error.errors : error;
    console.log(msg);

    throw new ValidationError(
      `Could not validate data schema for ${type}`,
      400,
    );
  }
};
