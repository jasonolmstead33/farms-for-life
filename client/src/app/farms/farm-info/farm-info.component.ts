import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Farm } from 'src/app/contracts/farm';

@Component({
  selector: 'app-farm-info',
  templateUrl: './farm-info.component.html',
  styleUrls: ['./farm-info.component.scss']
})
export class FarmInfoComponent implements OnInit {
  form: FormGroup;
  description: string;
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
      name: [this.farmData.name, []],
      contact: [this.farmData.contact, []],
      email: [this.farmData.email, []],
      address: [this.farmData.address, []],
      acres: [this.farmData.acres, []],
      weight: [this.farmData.acres, []],
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
