import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Area} from 'src/app/models/Area-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor( private http:HttpClient) { }
  readonly APIUrl ="https://localhost:44386/api";

  getAreaList(): Observable<Area[]>{
    return this.http.get<Area[]>(this.APIUrl + '/area');
  }
}
