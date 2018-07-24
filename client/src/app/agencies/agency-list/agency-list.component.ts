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
    this.allAgencies = this.agencyDataService.getAllAgencies().sort((a, b) => a.name.localeCompare(b.name));
    this.activeAgencies = this.allAgencies.filter(a => a.isActive);
    this.inactiveAgencies = this.allAgencies.filter(a => !a.isActive);
  }

  agencyClick(): void {
    console.log('clicked');
  }

  openDetailsDialog(agency: Agency): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = agency;

    const dialogRef = this.dialog.open(AgencyInfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
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

  toggleActive(agency: Agency) {
    agency.isActive = !agency.isActive;
    this.activeAgencies = this.allAgencies.filter(a => a.isActive);
    this.inactiveAgencies = this.allAgencies.filter(a => !a.isActive);
  }
}
