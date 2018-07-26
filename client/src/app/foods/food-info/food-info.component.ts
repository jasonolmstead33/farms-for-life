import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Food } from '../../contracts/food';

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.scss']
})
export class FoodInfoComponent implements OnInit {
  public form: FormGroup;

  public filterednames: Observable<string[]>;
  public filteredtypes: Observable<string[]>;
  public filteredunits: Observable<string[]>;
  public isCreate: boolean = false;

  private foodData: Food;
  private allFoods: Food[];
  private names: Set<string>;
  private types: Set<string>;
  private units: Set<string>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FoodInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.foodData = data.food;
    this.isCreate = data.isCreate;
    this.allFoods = data.allFoods

    this.names = new Set(this.allFoods.map(f => f.item));
    this.types = new Set(this.allFoods.map(f => f.type));
    this.units = new Set(this.allFoods.map(f => f.unit));
  }

  ngOnInit() {
    this.form = this.fb.group({
      item: [this.foodData.item, [Validators.required]],
      type: [this.foodData.type, [Validators.required]],
      unit: [this.foodData.unit, [Validators.required]],
      unitPrice: [this.foodData.unitPrice, [Validators.required, Validators.min(0)]],
      description: [this.foodData.description, []],
      include: [this.foodData.include, []],
    });

    this.filterednames = this.getFilterObservable('item', this.names, 1);
    this.filteredtypes = this.getFilterObservable('type', this.types);
    this.filteredunits = this.getFilterObservable('unit', this.units);
  }

  hasBlankRequiredFields() {
    const formData = this.form.value;
    return !formData || !formData.item || formData.item === ''
      || !formData.unit || formData.unit === ''
      || !formData.type || formData.type === ''
      || !formData.unitPrice || formData.unitPrice === '';
  }

  save() {
    if (this.isCreate && this.names.has(this.form.value.item)) {
      alert(`Entry already exists for ${this.form.value.item}. Choose a different name or update the existing entry`);
      return;
    }

    const price = Number(this.form.value.unitPrice);
    if (isNaN(price) || price <= 0) {
      alert('Invalid unit price');
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  private filter(allValues: Set<string>, value: string): string[] {
    const filterValue = value.toLowerCase();
    const returnArray = Array.from(allValues);
    return returnArray.filter(option => option.toLowerCase().includes(filterValue));
  }

  private getFilterObservable(formControlName: string, dataSource: Set<string>, startAfter: number = 0) {
    return this.form.get(formControlName).valueChanges.pipe(
      startWith(''),
      map(val => val.length >= startAfter ? this.filter(dataSource, val) : [])
    );
  }
}
