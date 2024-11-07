import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isLeapYear, isValid } from 'date-fns';

export function dateOfBirthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const day = control.get('day')?.value;
    const month = control.get('month')?.value;
    const year = control.get('year')?.value;

    if (!day || !month) {
      return { invalidDate: 'Day and month are required' };
    }

    const dayNumber = parseInt(day, 10);
    const monthNumber = parseInt(month, 10);
    const yearNumber = year ? parseInt(year, 10) : undefined;

    if (
      !isValid(
        new Date(
          Date.UTC(
            yearNumber ?? new Date().getFullYear(),
            monthNumber - 1,
            dayNumber,
          ),
        ),
      )
    ) {
      return { invalidDate: 'Invalid date of birth' };
    }

    return null;
  };
}
