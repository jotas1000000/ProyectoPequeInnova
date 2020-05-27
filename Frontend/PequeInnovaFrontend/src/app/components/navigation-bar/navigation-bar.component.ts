import { Component, OnInit } from '@angular/core';

import {FormControl, FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './../../core/services/authentication/authentication.service';
import {User} from './../../core//models/User.model';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  validatingForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  user:User= null;
  nameUserCurrent:string=null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    if (this.user){
      this.nameUserCurrent= this.user.name + ' ' +this.user.lastName;
      //alert(this.user.id);
      //if (this.authenticationService.getRoleUser === 'administrador') {
        //console.log(this.authenticationService.getRoleUser);
        //this.router.navigate(['./mainAdmin']);
     // }
    }
    this.validatingForm = new FormGroup({
    loginFormModalEmail: new FormControl('', Validators.email),
    loginFormModalPassword: new FormControl('', Validators.required)
    });

    //this.returnUrl = this.route.snapshot.queryParams['/home'] || '/home';
  }

  get f() { return this.validatingForm.controls; }

  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
    this.user=null;
    //window.location.reload();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.validatingForm.invalid) {
        return;
    }

    this.loading = true;
    //  this.authenticationService.login('Lucas1@hotmail.com', 'ElSalesiano1!')
    this.authenticationService.login(this.validatingForm.get('loginFormModalEmail').value ,
                                     this.validatingForm.get('loginFormModalPassword').value)
        .pipe(first())
        .subscribe(
            data => {
                this.user=data;
               // this.nameUserCurrent= this.user.name + ' ' +this.user.lastName;
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

  FunctionRegisterNavigate(){
    this.router.navigate(['./registerStudent']);
  }
  navToMainAdmin() {
    if (this.user.role === 'administrador') {
      this.router.navigate(['./mainAdmin']);
    }
  }

}
