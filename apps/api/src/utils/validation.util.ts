import { z } from 'zod';


const optionalNumberFromString = () =>z.string().nullish().transform((arg, ctx)=> {
  if (arg == null) return null;
  const value = Number(arg);
  if (Number.isNaN(value)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Value should be a number',
    });
  }
  return value;
});

const requiredNumberFromString = (name: string) => z.string()
  .min(1, `Please enter the ${name}`)
  .transform(Number)
  .refine((value) => !Number.isNaN(value), `${name} should be a number`);

export default { optionalNumberFromString, requiredNumberFromString };