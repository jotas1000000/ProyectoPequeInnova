import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import {Area} from './../../models/Area.model';
@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) { }

  getAreas(id: string, showCourses: string){
    return this.http.get<Array<Area>>(`${environment.apiUrl}/Area?orderBy=${id}&showCourses=${showCourses}`);
  }
}
