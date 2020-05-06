import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from './../models/Lesson';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }
  readonly APIUrl ="https://localhost:5001/api";

  getLessonList(areaId: number, courseId : number, sectionId: number): Observable<Lesson[]>{
    const href = `${this.APIUrl}/area/${areaId}/courses/${courseId}/sections/${sectionId}/lessons`;
    return this.http.get<Lesson[]>(href);
  }
}
