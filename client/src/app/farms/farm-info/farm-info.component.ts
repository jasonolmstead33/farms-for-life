import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Farm } from 'src/app/contracts/farm';

@Component({
  selector: 'app-farm-info',
  templateUrl: './farm-info.component.html',
  styleUrls: ['./farm-info.component.scss']
})
export class FarmInfoComponent implements OnInit {
  form: FormGroup;
  farmData: Farm;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FarmInfoComponent>,
    @Inject(MAT_DIALOG_DATA) farm: Farm
  ) {
    this.farmData = farm;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.farmData.name, [Validators.required]],
      contact: [this.farmData.contact, [Validators.required]],
      email: [this.farmData.email, [Validators.required, Validators.email]],
      address: [this.farmData.address, [Validators.required]],
      acres: [this.farmData.acres, []],
      weight: [this.farmData.acres, [Validators.required, Validators.min(0), Validators.max(100)]],
      isActive: [this.farmData.isActive, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
