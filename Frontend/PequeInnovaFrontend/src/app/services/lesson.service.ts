import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from './../models/Lesson';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }
  readonly APIUrl =`${environment.apiUrl}`;

  getLessonList(areaId: number, courseId : number): Observable<Lesson[]>{
    const href = `${this.APIUrl}/area/${areaId}/course/${courseId}/lesson`;
    return this.http.get<Lesson[]>(href);
  }

  getLesson(areaId: number, courseId : number, lessonId:number): Observable<Lesson>{
    const href = `${this.APIUrl}/area/${areaId}/course/${courseId}/lesson/${lessonId}`;
    return this.http.get<Lesson>(href);
  }

  getLessonsWithComments(areaId: number, courseId : number): Observable<Lesson[]>{
    const href = `${this.APIUrl}/area/${areaId}/course/${courseId}/lesson/?showComments=true`;
    return this.http.get<Lesson[]>(href);
  }
}
