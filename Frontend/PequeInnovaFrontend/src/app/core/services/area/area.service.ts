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

  createArea(newArea: Area){
    return this.http.post<Area>(`${environment.apiUrl}/Area`, newArea);
  }

  editArea(area: Area) {
    return this.http.put<Area>(`${environment.apiUrl}/Area/${area.id}`, area);
  }

  deleteArea(areaId: number) {
    return this.http.put<boolean>(`${environment.apiUrl}/Area/${areaId}/status`, null);
  }
}
