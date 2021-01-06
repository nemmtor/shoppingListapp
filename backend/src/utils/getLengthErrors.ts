import { length } from 'class-validator';

import { IFormError, sharedFieldsLengths } from '../../../shared';

export const getLengthErrors = (field: string): IFormError | null => {
  // Get min and max length from shared files, based on field key
  const { min, max } = sharedFieldsLengths[field];

  const hasValidLength = length(field, min, max);
  if (!hasValidLength) {
    return {
      field,
      error: `${field} must be between ${min} and ${max} characters long.`,
    };
  }
  return null;
};
