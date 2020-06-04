import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../../../environments/environment';
import {Teaching} from './../../../core/models/Teaching.model';
@Injectable({
  providedIn: 'root'
})
export class TeachingService {

  constructor(private http: HttpClient) { }

  createTeaching(teaching: Teaching) {
    return this.http.post<boolean>(`${environment.apiUrl}/Teaching`, teaching);
  }
}
