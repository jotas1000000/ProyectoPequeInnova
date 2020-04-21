import { Component, OnInit } from '@angular/core';

import {FormControl, FormBuilder,FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './../../core/services/authentication/authentication.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/areas']);
    }
  }

  ngOnInit(): void {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/areas';
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
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

}
