import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Agency } from 'src/app/contracts/agency';

@Injectable({
  providedIn: 'root'
})
export class AgencyDataService {
  constructor() { }

  public getAllAgencies(): Agency[] {
    return tempAgencyData;
  }

  public getAgencyInfo(agencyId: string): Agency {
    return tempAgencyData.find(a => a.id === agencyId);
  }
}

export const tempAgencyData: Agency[] = [
  {
    id: '1',
    name: 'Kirkland Agency',
    contact: 'Agency Owner',
    phone: '',
    email: '',
    address: '',
    numberServed: 100,
    isActive: true,
  },
  {
    id: '2',
    name: 'Bellevue Agency',
    contact: 'Joe Agencyer',
    phone: '',
    email: '',
    address: '',
    numberServed: 25,
    isActive: true,
  },
  {
    id: '3',
    name: 'Woodinville Agency',
    contact: 'Someone else',
    phone: '',
    email: '',
    address: '',
    numberServed: 25,
    isActive: true,
  },
  {
    id: '4',
    name: 'Snoqualmie Agency',
    contact: 'Sno valley agencyer',
    phone: '',
    email: '',
    address: '',
    numberServed: 25,
    isActive: true,
  },
  {
    id: '5',
    name: 'Bothell Agency',
    contact: 'My Man',
    phone: '',
    email: '',
    address: '',
    numberServed: 25,
    isActive: false,
  },
];
