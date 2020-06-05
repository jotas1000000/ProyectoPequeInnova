import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import {ResponseId} from './../../models/ResponseId.model';
import {School} from './../../models/School.model';
@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getSchools() {
    return this.http.get<Array<School>>(`${environment.apiUrl}/School`);
  }
}
