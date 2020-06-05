import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {AuthenticationService} from './../../core/services/authentication/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      const currentUser = this.authenticationService.currentUserValue;
      const booler = this.authenticationService.getBoolRoleUSer;
   /*    const sttg='Data';
      console.log(sttg); */
      if(currentUser.role ==='Estudiante')
      {
        /* if(localStorage.currentUser.role)*/
        return true;
      }
      //this.router.navigate(['/home'], {queryParams: {returnUrl: state.url}});
      this.router.navigate(['/home']);
      return false;
    }


  /*canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }*/
  
}
