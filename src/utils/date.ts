import { differenceInCalendarDays, differenceInYears } from 'date-fns';
import { DateOfBirth } from '../friend';

const today = new Date();
const currentMonth = today.getMonth() + 1;

const dateFormatWithoutYear = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
});
const dateTimeFormatWithYear = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function dateOfBirthToDate(dateOfBirth: Required<DateOfBirth>): Date {
  return new Date(dateOfBirth.year, dateOfBirth.month - 1, dateOfBirth.day);
}

export function formatBirthdate(dateOfBirth: DateOfBirth): string {
  return dateFormatWithoutYear.format(
    dateOfBirthToDate({ ...dateOfBirth, year: today.getFullYear() })
  );
}

export function calculateDaysUntilBirthdate(dateOfBirth: DateOfBirth): number {
  if (
    currentMonth === dateOfBirth.month &&
    today.getDate() === dateOfBirth.day
  ) {
    return 0;
  }

  if (
    currentMonth > dateOfBirth.month ||
    (currentMonth === dateOfBirth.month && today.getDate() > dateOfBirth.day)
  ) {
    return differenceInCalendarDays(
      dateOfBirthToDate({ ...dateOfBirth, year: today.getFullYear() + 1 }),
      today
    );
  }

  return differenceInCalendarDays(
    dateOfBirthToDate({ ...dateOfBirth, year: today.getFullYear() }),
    today
  );
}

export function calculateAge(dateOfBirth: DateOfBirth): number | undefined {
  if (!dateOfBirth.year) {
    return undefined;
  }
  return differenceInYears(
    today,
    dateOfBirthToDate(dateOfBirth as Required<DateOfBirth>)
  );
}
