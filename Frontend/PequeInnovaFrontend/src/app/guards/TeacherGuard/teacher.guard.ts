import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router ,UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './../../core/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.currentUserValue;
      const booler = this.authenticationService.getBoolRoleUSer;
      if (currentUser.role === 'Profesor' || currentUser.role === 'Administrador' ||  currentUser.role === 'administrador')
      {
        return true;
      }
      this.router.navigate(['/home']);
      return false;
  }
  
}
