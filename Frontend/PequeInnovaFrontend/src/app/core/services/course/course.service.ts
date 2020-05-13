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
}
