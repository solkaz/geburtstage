import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export type ExportMethod = 'csv' | 'json';

@Component({
    selector: 'app-export-dialog',
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    templateUrl: './export-dialog.component.html',
    styleUrl: './export-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportDialogComponent {
  readonly CSV_EXPORT_METHOD: ExportMethod = 'csv';
  readonly JSON_EXPORT_METHOD: ExportMethod = 'json';

  readonly dialogRef = inject(MatDialogRef<ExportDialogComponent>);
}
