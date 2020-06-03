import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import { Teacher } from '../../models/Teacher.model';
import { Observable } from 'rxjs';
import { RegisterTeacher } from '../../models/RegisterTeacher.model';
import {AssignmentR} from './../../../core/models/AssignmentR.model';
import { EditTeacher } from '../../models/EditTeacher.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  getAllTeachers(): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${environment.apiUrl}/User/Teachers`)
  }

  registerTeacher(newTeacher: RegisterTeacher) {
    return this.http.post<any>(`${environment.apiUrl}/Auth/UserTeacher`, newTeacher);
  }

  getAssignmentTeacher(userId: string) {
    return this.http.get<AssignmentR>(`${environment.apiUrl}/User/${userId}/Assignment`);
  }

  deleteTeacher(id: string){
    return this.http.put<any>(`${environment.apiUrl}/User/${id}/DeleteUser`,"");
  }

  editTeacher(newTeacher: Teacher){
    return this.http.put<any>(`${environment.apiUrl}/User/UpdateTeacher`, newTeacher)
  }

  getTeacher(userId: string){
    return this.http.get<EditTeacher>(`${environment.apiUrl}/User/${userId}/Teacher`);
  }
 
}
