import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatasCardForm, DetailsCard } from './datas-card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  http = inject(HttpClient);

  create(datas: DatasCardForm): Observable<DetailsCard> {
    const url = 'http://localhost:8080/cards';
    return this.http.post<DetailsCard>(url, datas);
  }
}
