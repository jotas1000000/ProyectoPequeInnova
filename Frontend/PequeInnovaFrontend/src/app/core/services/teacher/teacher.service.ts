import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import { Teacher } from '../../models/Teacher.model';
import { Observable } from 'rxjs';
import { RegisterTeacher } from '../../models/RegisterTeacher.model';
import {AssignmentR} from './../../../core/models/AssignmentR.model';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  readonly APIUrl ="https://localhost:5001/api";

  getAllTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.APIUrl + '/User/Teachers')
  }

  registerTeacher(newTeacher: RegisterTeacher) {
    return this.http.post<any>(`${environment.apiUrl}/Auth/UserTeacher`, newTeacher);
  }

  getAssignmentTeacher(userId: string) {
    return this.http.get<AssignmentR>(`${environment.apiUrl}/User/${userId}/Assignment`);
  }
}
