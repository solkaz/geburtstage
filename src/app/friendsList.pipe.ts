import { Pipe, type PipeTransform } from '@angular/core';
import { FriendDisplay, FriendsList } from '../friend';
import { calculateAge, calculateDaysUntilBirthdate } from '../utils/date';

@Pipe({
  name: 'appFriendsList',
  standalone: true,
})
export class FriendsListPipe implements PipeTransform {
  transform(friendsList: FriendsList): FriendDisplay[] {
    return friendsList
      .map((friend) => {
        return {
          ...friend,
          daysUntilBirthday: calculateDaysUntilBirthdate(friend.dateOfBirth),
          age: calculateAge(friend.dateOfBirth),
        };
      })
      .sort((a, b) => {
        return a.daysUntilBirthday > b.daysUntilBirthday
          ? 1
          : b.daysUntilBirthday < a.daysUntilBirthday
          ? -1
          : 0;
      });
  }
}
