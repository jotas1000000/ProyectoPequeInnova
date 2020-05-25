import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Area} from './../../../core/models/Area.model';
import { AreaService} from './../../../core/services/area/area.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TeacherService } from './../../../core/services/teacher/teacher.service';
import { AssignmentR } from './../../../core/models/AssignmentR.model';
import { AuthenticationService } from './../../../core/services/authentication/authentication.service';
import { User } from './../../../core/models/User.model';
@Component({
  selector: 'app-main-page-teacher',
  templateUrl: './main-page-teacher.component.html',
  styleUrls: ['./main-page-teacher.component.scss']
})
export class MainPageTeacherComponent implements OnInit, AfterViewInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: ['ANTERIOR', 'SIGUIENTE'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  };


  areas: Array<Area>;
  constructor(public breakpointObserver: BreakpointObserver,
              private areaService: AreaService,
              private teacherService: TeacherService,
              private authenticationService: AuthenticationService)
              { }


  slides: any = [[]];
  assignment: AssignmentR;
  user: User;

  chunk(arr, chunkSize): any {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    console.log(this.user);
    this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
      this.areas = AreasResponse;
      //console.log(this.areas);
    });

    this.teacherService.getAssignmentTeacher(this.user.id).subscribe(response => {
      this.assignment = response;
      console.log(this.assignment);
    });
  }

  ngAfterViewInit() {
  }

}
