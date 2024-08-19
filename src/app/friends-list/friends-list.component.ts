import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Friend, FriendsList } from '../../friend';
import { FriendsListItemComponent } from '../friends-list-item/friends-list-item.component';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [CommonModule, FriendsListItemComponent, MatListModule],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsListComponent {
  @Input({ required: true }) friends: FriendsList = [];
  @Output() updateList = new EventEmitter<FriendsList>();

  onUpdate(updatedFriend: Friend) {
    this.updateList.emit(
      this.friends.map((friend) => {
        if (friend.id === updatedFriend.id) {
          return updatedFriend;
        }
        return friend;
      })
    );
  }

  onDelete(idOfFriendToDelete: string) {
    this.updateList.emit(
      this.friends.filter(({ id }) => id !== idOfFriendToDelete)
    );
  }
}
