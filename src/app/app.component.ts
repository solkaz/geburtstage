import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendsService } from './Friends.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FriendsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'geburtstage';

  constructor(public friendsService: FriendsService) {}
}
