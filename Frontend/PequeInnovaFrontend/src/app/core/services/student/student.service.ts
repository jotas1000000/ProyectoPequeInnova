import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from '@angular/common/http';
import {RegisterStudent} from './../../models/RegisterStudent.model';
import {environment} from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/Student';
import { Inscription } from 'src/app/models/Inscription';
/* import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';  */
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  registerStudent(newStudent: RegisterStudent){
    return this.http.post<any>(`${environment.apiUrl}/Auth/UserStudent`, newStudent);
  }

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.apiUrl}/User/Students`);
  }
  
  getInscriptions(userId:string): Observable<Inscription[]>{
    return this.http.get<Inscription[]>(`${environment.apiUrl}/User/${userId}/InscriptionsUser`);
  } 

}
