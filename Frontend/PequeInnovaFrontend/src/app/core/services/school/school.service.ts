import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import {ResponseId} from './../../models/ResponseId.model';
import {EditSchool} from './../../models/EditSchool.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getSchools() {
    return this.http.get<Array<EditSchool>>(`${environment.apiUrl}/School`);
  }
  addSchools( school: EditSchool): Observable<EditSchool[]>{
    return this.http.post<EditSchool[]>(`${environment.apiUrl}/School`,school);
  }
  deleteSchools(id: string) {
    return this.http.put<EditSchool>(`${environment.apiUrl}/School/${id}/status`,"");
  }
  editSchools(id: string, school: EditSchool): Observable<EditSchool[]>{
    return this.http.put<EditSchool[]>(`${environment.apiUrl}/School/${id}`,school);
  }
}
