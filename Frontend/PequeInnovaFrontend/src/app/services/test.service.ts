import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from './../models/test';
import { Answers } from '../models/Answers';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }
  readonly APIUrl ="https://localhost:5001/api";

  getQuestionsList(areaId: number, courseId : number, lessonId:number): Observable<Test[]>{
    const href = `${environment.apiUrl}/area/${areaId}/course/${courseId}/lesson/${lessonId}/question`;
    return this.http.get<Test[]>(href);
  }

  getAnswersList(areaId: number, courseId : number, lessonId:number): Observable<Answers[]>{
    const href = `${environment.apiUrl}/area/${areaId}/course/${courseId}/lesson/${lessonId}/questions`;
    return this.http.get<Answers[]>(href);
  }

 
}
