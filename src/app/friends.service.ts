import { inject, Injectable } from '@angular/core';
import { Friend, FriendsList } from '../friend';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getFriends, updateFriends } from '../utils/localStorage';
import { createNewUuid } from '../utils/uuid';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  friends = this.constructFriends();

  private snackBar = inject(MatSnackBar);

  addFriend(friend: Friend) {
    this.updateFriendsInLocalStorage(
      this.friends.concat({
        ...friend,
        id: createNewUuid(),
      })
    );
    this.snackBar.open(`Entry for ${friend.name} added`);
  }

  updateFriend(updated: Friend) {
    console.log({ updated });

    this.updateFriendsInLocalStorage(
      this.friends.map((f) => {
        if (f.id === updated.id) {
          return updated;
        }
        return f;
      })
    );
    this.snackBar.open(`Entry for ${updated.name} updated`);
  }

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
