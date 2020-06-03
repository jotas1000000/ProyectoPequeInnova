import { Observable } from 'rxjs';
import { Course } from './../models/Course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  readonly APIUrl =`${environment.apiUrl}`;

  getCourseList(areaId: number): Observable<Course[]>{
    const href = `${this.APIUrl}/area/${areaId}/course`;
    return this.http.get<Course[]>(href);
  }
}
