import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { flatMap, catchError } from 'rxjs/operators';

import { FoodDataService } from '../food-data.service';
import { Food } from '../../contracts/food';
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
        this.allFoods.sort((a, b) => a.item.toLowerCase().localeCompare(b.item.toLowerCase()));
        this.dataSource = new MatTableDataSource(this.allFoods);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, headerId) => {
          if (typeof data[headerId] === 'string') {
            return data[headerId].toLowerCase();
          }

          return data[headerId];
        }

        this.sort.sort({
          id: 'item',
          start: 'asc',
          disableClear: true,
        });
      },
      e => this.error = e,
    );
  }

  openDetailsDialog(food: Food): void {
    const dialogRef = this.createDialogRef(food, false);
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data) {
          return;
        }

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
    const dialogRef = this.createDialogRef(<any>{}, true);
    dialogRef.componentInstance.isCreate = true;
    dialogRef.afterClosed().subscribe(
      data => this.subscribeWithData(this.foodDataService.create, data)
    );
  }

  delete(food: Food) {
    if (confirm(`Are you sure you want to delete ${food.item}?`)) {
      this.subscribeWithData(this.foodDataService.delete, food);
    }
  }

  private subscribeWithData(observableFunc, data) {
    if (!data) {
      return;
    }

    return observableFunc.call(this.foodDataService, data).subscribe(
      _ => this.refreshFoodsList(),
      error => alert(`Api Error: ${error}, data: ${JSON.stringify(data)}`)
    );
  }

  private refreshFoodsList() {
    this.foodDataService.list().subscribe(
      foodList => {
        this.allFoods = foodList;
        this.allFoods.sort((a, b) => a.item.toLowerCase().localeCompare(b.item.toLowerCase()));
        this.dataSource.data = this.allFoods;
        this.sort.sort({
          id: 'item',
          start: 'asc',
          disableClear: true,
        });
      },
      e => this.error = e,
    )
  }

  private createDialogRef(food: Food, isCreate: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      food: food,
      isCreate: isCreate,
      allFoods: this.allFoods
    };

    return this.dialog.open(FoodInfoComponent, dialogConfig);
  }
}
