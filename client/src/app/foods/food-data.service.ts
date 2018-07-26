import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../contracts/food';
import { apiRoute } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class FoodDataService {
  private baseRoute = `${apiRoute}/foods`;

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<Food[]> {
    return this.http.get<Food[]>(this.baseRoute);
  }
}
