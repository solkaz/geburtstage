import { Component } from '@angular/core';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendsService } from './Friends.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, FriendsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'geburtstage';

  constructor(public friendsService: FriendsService) {}
}
