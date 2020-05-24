import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import {Course} from './../../models/Course.model';
import {LessonN} from './../../models/LessonN.model';
import {ResponseId} from './../../models/ResponseId.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }

  registerNewLesson(newLesson: LessonN, areaId: number, courseId: number){
    return this.http.post<ResponseId>(`${environment.apiUrl}/Area/${areaId}/Course/${courseId}/Lesson/CreateLesson`, newLesson);
  }

  updateLesson(courseId: number, areaId: number, lesson: LessonN) {
    return this.http.put<boolean>(`${environment.apiUrl}/Area/${areaId}/Course/${courseId}/Lesson/${lesson.id}/EditLesson`, lesson);
  }
}
