import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { FriendDisplay } from '../../friend';
import { FriendsListItemComponent } from '../friends-list-item/friends-list-item.component';

@Component({
  selector: 'app-friends-list',
  imports: [FriendsListItemComponent, MatListModule],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsListComponent {
  @Input({ required: true }) friends: FriendDisplay[] = [];
}
