import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { Agency } from 'src/app/contracts/agency';
import { AgencyDataService } from '../agency-data.service';
import { AgencyInfoComponent } from '../agency-info/agency-info.component';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss']
})
export class AgencyListComponent implements OnInit {
  public activeAgencies: Agency[];
  public inactiveAgencies: Agency[];
  private allAgencies: Agency[];

  constructor(
    private agencyDataService: AgencyDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.allAgencies = this.agencyDataService.getAllAgencies();
    this.separateInactiveAgencies();
  }

  openDetailsDialog(agency: Agency): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = agency;

    const dialogRef = this.dialog.open(AgencyInfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data) { return; }
        agency.name = data.name;
        agency.numberServed = data.numberServed;
        agency.address = data.address;
        agency.contact = data.contact;
        agency.email = data.email;
        agency.phone = data.phone;
        if (agency.isActive !== data.isActive) {
          this.toggleActive(agency);
        }
      }
    );
  }

  addNewAgency(): void {
    const dialogRef = this.createDialogRef(<any>{ name: 'New Agency', isActive: true });
    dialogRef.afterClosed().subscribe(
      data => {
        const agency: Agency = {
          id: `${this.allAgencies.length + 1}`,
          name: data.name,
          numberServed: data.numberServed,
          address: data.address,
          contact: data.contact,
          email: data.email,
          phone: data.phone,
          isActive: data.isActive
        };

        this.allAgencies.push(agency);
        this.separateInactiveAgencies();
      }
    );
  }

  toggleActive(agency: Agency) {
    agency.isActive = !agency.isActive;
    this.separateInactiveAgencies();
  }

  delete(agency: Agency) {
    event.cancelBubble = true;
    if (event.stopPropagation) { event.stopPropagation(); }

    if (confirm(`Are you sure you want to delete ${agency.name}?`)) {
      const index = this.allAgencies.indexOf(agency);
      if (index !== -1) {
        this.allAgencies.splice(index, 1);
        this.separateInactiveAgencies();
      }
    }
  }

  private separateInactiveAgencies() {
    this.allAgencies.sort((a, b) => a.name.localeCompare(b.name));
    this.activeAgencies = this.allAgencies.filter(f => f.isActive);
    this.inactiveAgencies = this.allAgencies.filter(f => !f.isActive);
  }

  private createDialogRef(agency: Agency) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = agency;

    return this.dialog.open(AgencyInfoComponent, dialogConfig);
  }
}
