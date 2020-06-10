import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './../../core/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authenticationService.currentUserValue;
      const booler = this.authenticationService.getBoolRoleUSer;
      if (currentUser.role === 'Estudiante' || currentUser.role === 'Profesor' || currentUser.role === 'Administrador')
      {
        return true;
      }
      this.router.navigate(['/home']);
      return false;
  }
}
