import { Component, OnInit } from '@angular/core';
import {CourseService} from './../../../core/services/course/course.service';
import {Course} from './../../../core/models/Course.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-teacher-page',
  templateUrl: './course-teacher-page.component.html',
  styleUrls: ['./course-teacher-page.component.scss']
})
export class CourseTeacherPageComponent implements OnInit {

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
