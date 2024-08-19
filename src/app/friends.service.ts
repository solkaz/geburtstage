import { inject, Injectable } from '@angular/core';
import { Friend, FriendsList } from '../friend';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getFriends, updateFriends } from '../utils/localStorage';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  friends = this.constructFriends();

  private snackBar = inject(MatSnackBar);

  deleteFriend(friend: Friend) {
    this.updateFriendsInLocalStorage(
      this.friends.filter(({ id }) => id !== friend.id)
    );
    this.snackBar.open(`Entry for ${friend.name} deleted`);
  }

  private constructFriends(): FriendsList {
    try {
      const friends = getFriends();
      return friends;
    } catch (error: any) {
      console.log({ error });

      this.snackBar.open(error);
      return [];
    }
  }
  private updateFriendsInLocalStorage(friends: FriendsList) {
    updateFriends(friends);
    this.friends = friends;
  }
}
