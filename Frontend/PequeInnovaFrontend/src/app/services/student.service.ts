import { Injectable } from '@angular/core';
import { Inscription } from '../models/Inscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient){ }
  readonly APIUrl =`${environment.apiUrl}/User/CreateInscription`;

  inscription (inscription:Inscription) : Observable<Inscription> {
    return this.http.post<Inscription>(this.APIUrl, inscription)
  }
  
}
