import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Agency } from '../../contracts/agency';

@Component({
  selector: 'app-agency-info',
  templateUrl: './agency-info.component.html',
  styleUrls: ['./agency-info.component.scss']
})
export class AgencyInfoComponent implements OnInit {
  form: FormGroup;
  agencyData: Agency;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgencyInfoComponent>,
    @Inject(MAT_DIALOG_DATA) agency: Agency
  ) {
    this.agencyData = agency;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.agencyData.name, [Validators.required]],
      contact: [this.agencyData.contact, [Validators.required]],
      email: [this.agencyData.email, [Validators.required, Validators.email]],
      address: [this.agencyData.address, [Validators.required]],
      numberServed: [this.agencyData.numberServed, [Validators.min(0)]],
      isActive: [this.agencyData.isActive, []],
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
