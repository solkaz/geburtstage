import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FriendsList } from '../../friend';
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
}
