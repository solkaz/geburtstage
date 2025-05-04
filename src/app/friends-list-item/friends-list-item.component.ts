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
import { FriendFormDialogComponent } from '../friend-form-dialog/friend-form-dialog.component';

@Component({
  selector: 'app-friends-list-item',
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

  onEdit() {
    this.dialog
      .open(FriendFormDialogComponent, { data: this.item })
      .afterClosed()
      .subscribe((updated) => {
        if (updated) {
          this.friendsService.updateFriend({
            ...this.item,
            ...updated,
          });
        }
      });
  }

  onDeleteRequested() {
    this.dialog
      .open(ConfirmDeleteComponent, { data: this.item })
      .afterClosed()
      .subscribe((shouldDelete) => {
        if (shouldDelete) {
          this.friendsService.deleteFriend(this.item);
        }
      });
  }
}
