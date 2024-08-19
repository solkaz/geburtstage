import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Friend } from '../../friend';
import { DateOfBirthPipe } from '../dateOfBirth.pipe';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-friends-list-item',
  standalone: true,
  imports: [CommonModule, DateOfBirthPipe, MatListModule],
  templateUrl: './friends-list-item.component.html',
  styleUrl: './friends-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsListItemComponent {
  @Input({ required: true }) item!: Friend;
}
