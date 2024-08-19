import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Friend } from '../../friend';
import { DateOfBirthPipe } from '../dateOfBirth.pipe';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-friends-list-item',
  standalone: true,
  imports: [
    CommonModule,
    DateOfBirthPipe,
    MatListModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './friends-list-item.component.html',
  styleUrl: './friends-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsListItemComponent {
  @Input({ required: true }) item!: Friend;

  @Output() delete = new EventEmitter<string>();

  readonly dialog = inject(MatDialog);

  onDeleteRequested(): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: this.item,
    });

    dialogRef.afterClosed().subscribe((shouldDelete) => {
      if (shouldDelete) {
        this.delete.emit(this.item.id);
      }
    });
  }
}
