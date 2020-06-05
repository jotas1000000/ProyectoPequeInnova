import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import {Course} from './../../models/Course.model';
import {ResponseId} from './../../models/ResponseId.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  registerNewCourse(newCourse: Course){
    return this.http.post<ResponseId>(`${environment.apiUrl}/Area/${newCourse.areaId}/Course/CreateCourse`, newCourse);
  }
  updateCourse(courseId: number, areaId: number, course: Course) {
    return this.http.put<Course>(`${environment.apiUrl}/Area/${areaId}/Course/${courseId}`, course);
  }
  getCoursesByArea(areaId: number){
    return this.http.get<Array<Course>>(`${environment.apiUrl}/Area/${areaId}/Course`);
  }

  getCourseById(courseId: number, areaId: number){
    return this.http.get<Course>(`${environment.apiUrl}/Area/${areaId}/Course/${courseId}/EditCourse`);
  }

  deleteCourse(course: Course){
    return this.http.put<boolean>(`${environment.apiUrl}/Area/${course.areaId}/Course/${course.id}/status`, course);
  }

  getCourseByOwner(userId: string) {
    return this.http.get<Array<Course>>(`${environment.apiUrl}/Area/0/Course/ByOwner/${userId}`);
  }
}

