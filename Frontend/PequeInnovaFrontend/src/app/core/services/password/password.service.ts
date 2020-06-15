import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PasswordChange } from '../../models/PasswordChange';
import { ForcePasswordChange } from '../../models/ForcePasswordChange';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  changeOwnPassword(id: string, passwords:PasswordChange): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/User/${id}/SetPassword`,passwords)
  }
  forceChangePassword(adminId, passwords:ForcePasswordChange): Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/User/${adminId}/SetPassword`,passwords)
  }
}
