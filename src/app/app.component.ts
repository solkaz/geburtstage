import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FriendsList } from '../friend';
import { getFriends } from '../utils/localStorage';
import { FriendsListComponent } from './friends-list/friends-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FriendsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'geburtstage';
  friends: FriendsList;

  constructor() {
    try {
      this.friends = getFriends();
    } catch (error) {
      // TODO: notify that data is malformed
      this.friends = [];
    }
  }
}
