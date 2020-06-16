import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Area} from 'src/app/models/Area';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor( private http: HttpClient) { }

  getAreaList(): Observable<Area[]>{
    return this.http.get<Area[]>(`${environment.apiUrl}/area`);
  }
}
