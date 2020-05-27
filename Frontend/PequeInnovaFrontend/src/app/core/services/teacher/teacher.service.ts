import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import { Teacher } from '../../models/Teacher.model';
import { Observable } from 'rxjs';
import { RegisterTeacher } from '../../models/RegisterTeacher.model';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  readonly APIUrl ="https://localhost:44386/api";

  getAllTeachers():Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.APIUrl + '/User/Teachers')
  }

  registerTeacher(newTeacher: RegisterTeacher) {
    return this.http.post<any>(`${environment.apiUrl}/Auth/UserTeacher`, newTeacher);
  }

  deleteTeacher(id: string){
    return this.http.put<any>(`${environment.apiUrl}/User/${id}/DeleteUser`,"");
  }

  editTeacher(newTeacher: Teacher){
    return this.http.put<any>(`${environment.apiUrl}/User/UpdateTeacher`, newTeacher)
  }
}
