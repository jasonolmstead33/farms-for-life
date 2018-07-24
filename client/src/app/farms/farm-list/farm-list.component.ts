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
    this.allFarms = this.farmDataService.getAllFarms();
    this.separateInactiveFarms();
  }

  openDetailsDialog(farm: Farm): void {
    const dialogRef = this.createDialogRef(farm);
    dialogRef.afterClosed().subscribe(
      data => {
        farm.name = data.name;
        farm.acres = data.acres;
        farm.address = data.address;
        farm.contact = data.contact;
        farm.email = data.email;
        farm.phone = data.phone;
        farm.weight = data.weight;
        if (farm.isActive !== data.isActive) {
          this.toggleActive(farm);
        }
      }
    );
  }

  toggleActive(farm: Farm): void {
    farm.isActive = !farm.isActive;
    this.separateInactiveFarms();
  }

  addNewFarm(): void {
    const dialogRef = this.createDialogRef(<any>{ name: 'New Farm', isActive: true });
    dialogRef.afterClosed().subscribe(
      data => {
        const farm: Farm = {
          id: `{this.allFarms.length + 1}`,
          name: data.name,
          acres: data.acres,
          address: data.address,
          contact: data.contact,
          email: data.email,
          phone: data.phone,
          weight: data.weight,
          isActive: data.isActive
        };

        this.allFarms.push(farm);
        this.separateInactiveFarms();
      }
    );
  }

  delete(farm: Farm) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }

    if (confirm(`Are you sure you want to delete ${farm.name}?`)) {
      const index = this.allFarms.indexOf(farm);
      if (index !== -1) {
        this.allFarms.splice(index, 1);
        this.separateInactiveFarms();
      }
    }
  }

  private separateInactiveFarms() {
    this.allFarms.sort((a, b) => a.name.localeCompare(b.name));
    this.activeFarms = this.allFarms.filter(f => f.isActive);
    this.inactiveFarms = this.allFarms.filter(f => !f.isActive);
  }

  private createDialogRef(farm: Farm) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = farm;

    return this.dialog.open(FarmInfoComponent, dialogConfig);
  }
}
