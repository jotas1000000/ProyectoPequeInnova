import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from './../../../../environments/environment.prod';
import {UserNav} from './../../models/UserNav.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<UserNav[]>(`${environment.apiUrl}/Auth/Users`);
  }
}
