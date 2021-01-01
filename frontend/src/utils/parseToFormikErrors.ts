import { IFormError } from '../../../shared';

export const parseToFormikErrors = (
  errors: IFormError[],
): Record<string, string> => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, error }) => {
    errorMap[field] = error;
  });

  return errorMap;
};
