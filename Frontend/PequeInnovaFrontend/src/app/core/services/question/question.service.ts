import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../../environments/environment.prod';
import {Course} from './../../models/Course.model';
import {LessonN} from './../../models/LessonN.model';
import {Question} from './../../models/Question.model';
import {ResponseId} from './../../models/ResponseId.model';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  registerNewQuestion(newQuestion: Question, areaId: number, courseId: number, LessonId: number){
    return this.http.post<ResponseId>(`${environment.apiUrl}/Area/${areaId}/Course/${courseId}/Lesson/${LessonId}/Question/CreateQuestion`, newQuestion);
  }

  updateQuestion(lessonId: number, courseId: number, areaId: number, question: Question ) {
    return this.http.put<any>(`${environment.apiUrl}/Area/${areaId}/Course/${courseId}/Lesson/${lessonId}/Question/${question.id}`, question);
  }
}
