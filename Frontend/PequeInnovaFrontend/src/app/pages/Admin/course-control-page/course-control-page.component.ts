import { Component, OnInit } from '@angular/core';
import {CourseService} from './../../../core/services/course/course.service';
import {Course} from './../../../core/models/Course.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course-control-page',
  templateUrl: './course-control-page.component.html',
  styleUrls: ['./course-control-page.component.scss']
})
export class CourseControlPageComponent implements OnInit {

  courseCards: Array<Course>;
  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute) { }

  // Route vars
  areaId: number;
  courseId: number;
  lessonId: number;

  ngOnInit(): void {
    this.setRouteVariables();
    this.courseService.getCoursesByArea(this.areaId).subscribe(ListCourseResponse => {
      this.courseCards = ListCourseResponse;
    });
  }

  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
  
      //console.log(params);
      //console.log("AAAAAAAA" + this.areaId);

    });
  }

  DeleteCourse(value: Course) {
    this.courseService.deleteCourse(value).subscribe((response) => {
      if (response) {
        console.log(response);
        const pos = this.courseCards.indexOf(value);
        this.courseCards.splice(pos, 1);
      }
    });
  }

}
