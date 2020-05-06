import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegisterStudent} from './../../models/RegisterStudent.model';
import {environment} from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  registerStudent(newStudent: RegisterStudent){
    return this.http.post<any>(`${environment.apiUrl}/Auth/UserStudent`, newStudent);
  }
}
