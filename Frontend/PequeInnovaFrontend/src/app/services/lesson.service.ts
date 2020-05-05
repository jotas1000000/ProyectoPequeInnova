import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from './../models/Lesson';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }
  readonly APIUrl = "https://localhost:3000";

  getLessonsList(areaId: number,courseId: number): Observable<Lesson[]>{
    /* const href = `${this.APIUrl}/area/${areaId}/courses`; */
    const href = `${this.APIUrl}/courses/${courseId}/lessons`;
    return this.http.get<Lesson[]>(href);
  }
}
