import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FriendDisplay } from '../../friend';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DateOfBirthPipe } from '../dateOfBirth.pipe';
import { FriendsService } from '../friends.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-friends-list-item',
  standalone: true,
  imports: [
    DateOfBirthPipe,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './friends-list-item.component.html',
  styleUrl: './friends-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsListItemComponent {
  @Input({ required: true }) item!: FriendDisplay;

  constructor(public friendsService: FriendsService) {}

  readonly dialog = inject(MatDialog);

  get ageDisplay(): string {
    if (this.item.age) {
      return `(${this.item.age} years old)`;
    }
    return '';
  }

  get daysUntilBirthdateDisplay(): string {
    if (this.item.daysUntilBirthday) {
      return `${this.item.daysUntilBirthday} days from today`;
    }
    return `wish them a happy birthday!`;
  }

  onDeleteRequested(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: this.item,
    });

    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.friendsService.deleteFriend(this.item);
      }
    });
  }
}
