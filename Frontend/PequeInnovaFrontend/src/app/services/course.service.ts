import { Observable } from 'rxjs';
import { Course } from './../models/Course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  readonly APIUrl ="https://localhost:44386/api";

  getCourseList(areaId: number): Observable<Course[]>{
    const href = `${this.APIUrl}/area/${areaId}/courses`;
    return this.http.get<Course[]>(href);
  }
}
