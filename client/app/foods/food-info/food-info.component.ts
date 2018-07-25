import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Food } from '../../contracts/food';
import { FoodDataService } from '../food-data.service';

@Component({
  selector: 'app-food-info',
  templateUrl: './food-info.component.html',
  styleUrls: ['./food-info.component.scss']
})
export class FoodInfoComponent implements OnInit {
  public form: FormGroup;
  public foodNamesAutocomplete: Set<string>;
  public foodTypesAutocomplete: Set<string>;
  public unitsAutocomplete: Set<string>;

  private foodData: Food;
  private allFoods: Food[];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FoodInfoComponent>,
    private foodDataService: FoodDataService,
    @Inject(MAT_DIALOG_DATA) food: Food
  ) {
    this.foodData = food;
  }

  ngOnInit() {
    this.foodDataService.list().subscribe(
      foodList => {
        this.allFoods = foodList;
        this.foodNamesAutocomplete = new Set(this.allFoods.map(f => f.item));
        this.foodTypesAutocomplete = new Set(this.allFoods.map(f => f.type));
        this.unitsAutocomplete = new Set(this.allFoods.map(f => f.unit));
      }
    );

    this.form = this.fb.group({
      item: [this.foodData.item, [Validators.required]],
      type: [this.foodData.type, [Validators.required]],
      unit: [this.foodData.unit, [Validators.required]],
      unitPrice: [this.foodData.unitPrice, [Validators.required, Validators.min(0)]],
      description: [this.foodData.description, []],
      include: [this.foodData.include, []],
    });
  }

  save() {
    const formData = this.form.value;
    if (!formData || !formData.item || formData.item === ''
        || !formData.unit || formData.unit === ''
        || !formData.type || formData.type === ''
        || !formData.unitPrice || formData.unitPrice === '') {
      alert('You must fill out all required form fields to save');
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

  private _filter(allValues: Set<string>, value: string): string[] {
    const filterValue = value.toLowerCase();
    const returnArray = Array.from(allValues);
    return returnArray.filter(option => option.toLowerCase().includes(filterValue));
  }
}
