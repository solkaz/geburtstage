import { Pipe, type PipeTransform } from '@angular/core';
import { Friend } from '../friend';

@Pipe({
  name: 'appDateOfBirth',
  standalone: true,
})
export class DateOfBirthPipe implements PipeTransform {
  transform(value: Friend['dateOfBirth'], ...args: unknown[]): unknown {
    if (value.year) {
      return `${value.day}.${value.month}.${value.year}`;
    } else {
      return `${value.day}.${value.month}`;
    }
  }
}
