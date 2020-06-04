import { Injectable } from '@angular/core';
import { Inscription } from '../models/Inscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient){ }

  readonly APIUrl ="https://localhost:5001/api/User/CreateInscription";

  inscription (inscription:Inscription) : Observable<Inscription> {
    return this.http.post<Inscription>(this.APIUrl, inscription)
  }
  
 /*  getStudents(): Observable<Student[]>{
    return this.http.get<Area[]>(this.APIUrl + '/area');
  } */

}
