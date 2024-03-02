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

export default { optionalNumberFromString };