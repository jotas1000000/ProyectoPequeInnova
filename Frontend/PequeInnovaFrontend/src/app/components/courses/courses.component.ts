import { Area } from './../../models/Area';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/services/area.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/core/models/User.model';

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
    private authenticationService: AuthenticationService){ }

  public courses = [];
  public areas = [];

  public searchText: string;

  
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

    this.elements = 3;
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

}
