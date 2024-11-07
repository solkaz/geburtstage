import { Component, inject } from '@angular/core';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { FriendsService } from './friends.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FriendsListPipe } from './friendsList.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FriendFormDialogComponent } from './friend-form-dialog/friend-form-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import {
  ExportDialogComponent,
  ExportMethod,
} from './export-dialog/export-dialog.component';
import { exportAsCsv, exportAsJson } from '../utils/file';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FriendsListComponent,
    FriendsListPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly dialog = inject(MatDialog);

  constructor(public friendsService: FriendsService) {}

  onAddButtonClicked() {
    this.dialog
      .open(FriendFormDialogComponent)
      .afterClosed()
      .subscribe((newFriend) => {
        if (newFriend) {
          this.friendsService.addFriend(newFriend);
        }
      });
  }

  onExportClicked() {
    this.dialog
      .open(ExportDialogComponent)
      .afterClosed()
      .subscribe((exportMethod: ExportMethod) => {
        if (!exportMethod) {
          return;
        }
        if (exportMethod === 'csv') {
          exportAsCsv(this.friendsService.friends);
        } else {
          exportAsJson(this.friendsService.friends);
        }
      });
  }
}
