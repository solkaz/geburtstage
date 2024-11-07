import { Pipe, type PipeTransform } from '@angular/core';
import { DateOfBirth } from '../friend';
import { formatBirthdate } from '../utils/date';

@Pipe({
  name: 'appDateOfBirth',
  standalone: true,
})
export class DateOfBirthPipe implements PipeTransform {
  transform(value: DateOfBirth): string {
    return formatBirthdate(value);
  }
}
