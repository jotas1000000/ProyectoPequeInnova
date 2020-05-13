import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import { Teacher } from '../../models/Teacher.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }
  readonly APIUrl ="https://localhost:5001/api";

  getAllTeachers():Observable<Teacher[]>{
    return this.http.get<Teacher[]>(this.APIUrl + '/User/Teachers')
  }
}
