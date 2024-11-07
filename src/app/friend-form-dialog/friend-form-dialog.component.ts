import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { dateOfBirthValidator } from '../../utils/dateOfBirthValidator';
import { Friend } from '../../friend';

@Component({
  selector: 'app-friend-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './friend-form-dialog.component.html',
  styleUrl: './friend-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendFormDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<FriendFormDialogComponent>);
  readonly currentYear = new Date().getFullYear();
  form!: FormGroup;
  isEdit!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public friend?: Friend,
  ) {}

  ngOnInit() {
    this.isEdit = !!this.friend;
    this.form = this.formBuilder.group({
      name: [this.friend?.name ?? '', Validators.required],
      dateOfBirth: this.formBuilder.group(
        {
          day: [this.friend?.dateOfBirth.day ?? '', Validators.required],
          month: [
            this.friend?.dateOfBirth.month.toString() ?? '',
            Validators.required,
          ],
          year: [this.friend?.dateOfBirth.year ?? ''],
        },
        { validators: dateOfBirthValidator() },
      ),
    });
  }

  onSubmit() {
    this.form.markAsDirty();
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const formValue = this.form.value;

      this.dialogRef.close({
        name: formValue.name,
        dateOfBirth: {
          day: formValue.dateOfBirth.day,
          month: Number.parseInt(formValue.dateOfBirth.month),
          year: formValue.dateOfBirth.year ?? undefined,
        },
      });
    }
  }

  get titleDisplay(): string {
    if (this.isEdit) {
      return `Update ${this.friend!.name}`;
    }
    return 'Add friend';
  }
}
