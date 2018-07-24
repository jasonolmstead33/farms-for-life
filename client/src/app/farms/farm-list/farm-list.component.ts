import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Farm } from 'src/app/contracts/farm';
import { FarmDataService } from '../farm-data.service';
import { FarmInfoComponent } from '../farm-info/farm-info.component';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.scss']
})
export class FarmListComponent implements OnInit {
  public activeFarms: Farm[];
  public inactiveFarms: Farm[];
  private allFarms: Farm[];

  constructor(
    private farmDataService: FarmDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.allFarms = this.farmDataService.getAllFarms().sort((a, b) => a.name.localeCompare(b.name));
    this.activeFarms = this.allFarms.filter(f => f.isActive);
    this.inactiveFarms = this.allFarms.filter(f => !f.isActive);
  }

  farmClick(): void {
    console.log('clicked');
  }

  openDetailsDialog(farm: Farm): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = farm;

    const dialogRef = this.dialog.open(FarmInfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => console.log('Dialog output:', data)
    );
  }

  toggleActive(farm: Farm) {
    farm.isActive = !farm.isActive;
    this.activeFarms = this.allFarms.filter(f => f.isActive);
    this.inactiveFarms = this.allFarms.filter(f => !f.isActive);
  }
}