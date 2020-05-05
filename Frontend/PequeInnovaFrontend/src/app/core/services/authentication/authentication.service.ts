import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject,observable, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from './../../../../environments/environment';
import {User} from './../../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
     return this.currentUserSubject.value;
   }
   public get getBoolRoleUSer(): boolean {
     if(this.currentUserSubject.value.role === 'Estudiante')
     {
       return true;
     }
     console.log(this.currentUserSubject.value.name);//a
     return false;
   }

   login(Email: string, Password: string) {
     return this.http.post<User>(`${environment.apiUrl}/Auth/Login`,{Email,Password})
     .pipe(map(user => {
        localStorage.setItem('currentUser',JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
     }));
   }

   logout(){
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
   }



}
