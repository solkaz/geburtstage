import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FriendsList } from '../../friend';
import { DateOfBirthPipe } from '../dateOfBirth.pipe';

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [CommonModule, MatListModule, DateOfBirthPipe],
  templateUrl: './friends-list.component.html',
  styleUrl: './friends-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsListComponent {
  @Input({ required: true }) friends: FriendsList = [];
}
