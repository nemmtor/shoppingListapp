import { length } from 'class-validator';

import { IFormError, sharedConstrains, EConstrainKeys } from '../../../shared';

export const checkConstrains = (
  fields: Record<string, unknown>,
): (IFormError | null)[] => {
  return Object.entries(fields).map(([field, value]) => {
    // Get min and max length from shared files, based on field key
    const min = sharedConstrains[field as EConstrainKeys]?.min;
    const max = sharedConstrains[field as EConstrainKeys]?.max;

    if (min && max) {
      const hasValidLength = length(value, min, max);
      if (!hasValidLength) {
        return {
          field,
          error: `${field} must be between ${min} and ${max} characters long.`,
        };
      }
      return null;
    }
    throw new Error('Wrong constrain passed');
  });
};
