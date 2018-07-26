import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { FoodDataService } from '../food-data.service';
import { Food } from '../../contracts/food';
import { HttpErrorResponse } from '@angular/common/http';
import { FoodInfoComponent } from '../food-info/food-info.component';

@Component({
  selector: 'app-foods-list',
  templateUrl: './foods-list.component.html',
  styleUrls: ['./foods-list.component.scss']
})
export class FoodsListComponent implements OnInit {
  public allFoods: Food[];
  public displayedColumns = ['actions', 'item', 'type', 'unit', 'unitPrice'];
  public error: HttpErrorResponse;
  public dataSource: MatTableDataSource<Food>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private foodDataService: FoodDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.foodDataService.list().subscribe(
      foodList => {
        this.allFoods = foodList;
        this.allFoods.sort((a, b) => a.item.localeCompare(b.item));
        this.dataSource = new MatTableDataSource(this.allFoods);
        this.dataSource.sort = this.sort;
        this.sort.sort({
          id: 'item',
          start: 'asc',
          disableClear: false
        });
      },
      e => this.error = e,
    );
  }

  openDetailsDialog(food: Food): void {
    const dialogRef = this.createDialogRef(food);
    dialogRef.afterClosed().subscribe(
      data => {
        food.item = data.item;
        food.type = data.type;
        food.unit = data.unit;
        food.unitPrice = data.unitPrice;
        food.description = data.description;
        food.include = data.include;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewFood() {
    const dialogRef = this.createDialogRef(<any>{});
    dialogRef.afterClosed().subscribe(
      data => {
        console.log('closed!');
      }
    );
  }

  delete(food: Food) {
    if (confirm(`Are you sure you want to delete ${food.item}?`)) {
      console.log(`Deleting ${food.item}`);
    }
  }

  private createDialogRef(food: Food) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = food;

    return this.dialog.open(FoodInfoComponent, dialogConfig);
  }
}
