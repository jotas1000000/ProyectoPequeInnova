import { Area } from './../../models/Area';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from 'src/app/services/area.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/core/models/User.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(
    private areasService: AreaService,
    private coursesServices: CourseService,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router){ }

  public courses = [];
  public areas = [];

  public searchText: string;
  // Login vars
  validatingForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  nameUserCurrent: string = null;

  // Route vars
  areaId: number;
  // Area vars
  areaName: string;
  areaDescription : string;
  
  // vars
  elements: number;  
  totalCourses: number;

  //user vars
  user:User= null;
  userRole:string=null;

  ngOnInit(): void {
    this.setDataUser();
    this.setRouteVariables();
    this.setCoursesData();
    this.setAreaData();

    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });

    this.elements = 3;
  }


  get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.validatingForm.invalid) {
      return;
    }

    this.loading = true;
    //  this.authenticationService.login('Lucas1@hotmail.com', 'ElSalesiano1!')
    this.authenticationService.login(this.validatingForm.get('loginFormModalEmail').value,
      this.validatingForm.get('loginFormModalPassword').value)
      .pipe(first())
      .subscribe(
        data => {
          this.user = data;
          this.nameUserCurrent = this.user.name + ' ' + this.user.lastName;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  private setDataUser(){
    this.user = this.authenticationService.currentUserValue;
    if (this.user){
      this.userRole= this.user.role;
    }
  }

  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
    });
  }

  private setCoursesData(): void {
    this.coursesServices.getCourseList(this.areaId)
      .subscribe(data => {
        this.courses = data;
        this.totalCourses = data.length
      });
  }

  private setAreaData(): void {
    this.areasService.getAreaList()
      .subscribe(data => {
          this.areas = data;
          for (const area of data) {
            if (area.id == this.areaId) {
              this.areaName = area.name;
              this.areaDescription = area.description;
              break;
            }
          }
        });
  }


  seeMore():void{
    this.elements = this.elements + 3;
  }

  refresh(): void {
    window.location.reload();
  }

}
