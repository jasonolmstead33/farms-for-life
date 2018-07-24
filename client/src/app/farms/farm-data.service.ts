import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Farm } from 'src/app/contracts/farm';

@Injectable({
  providedIn: 'root'
})
export class FarmDataService {
  constructor() { }

  public getAllFarms(): Farm[] {
    return tempFarmData;
  }

  public getFarmInfo(farmId: string): Farm {
    return tempFarmData.find(f => f.id === farmId);
  }
}

export const tempFarmData: Farm[] = [
  {
    id: '1',
    name: 'Kirkland Farm',
    contact: 'Farm Owner',
    phone: '',
    email: '',
    address: '',
    weight: 30,
    acres: 1,
    isActive: true,
  },
  {
    id: '2',
    name: 'Bellevue Farm',
    contact: 'Joe Farmer',
    phone: '',
    email: '',
    address: '',
    weight: 5,
    acres: 0.5,
    isActive: true,
  },
  {
    id: '3',
    name: 'Woodinville Farm',
    contact: 'Someone else',
    phone: '',
    email: '',
    address: '',
    weight: 15,
    acres: 5,
    isActive: true,
  },
  {
    id: '4',
    name: 'Snoqualmie Farm',
    contact: 'Sno valley farmer',
    phone: '',
    email: '',
    address: '',
    weight: 40,
    acres: 10,
    isActive: true,
  },
  {
    id: '5',
    name: 'Bothell Farm',
    contact: 'My Man',
    phone: '',
    email: '',
    address: '',
    weight: 10,
    acres: 1,
    isActive: false,
  },
];
