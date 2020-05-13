import { Component, OnInit } from '@angular/core';
import {CourseService} from './../../../core/services/course/course.service';
import {Course} from './../../../core/models/Course.model';
@Component({
  selector: 'app-course-control-page',
  templateUrl: './course-control-page.component.html',
  styleUrls: ['./course-control-page.component.scss']
})
export class CourseControlPageComponent implements OnInit {

  courseCards: Array<Course>;
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCoursesByArea(1).subscribe(ListCourseResponse => {
      this.courseCards = ListCourseResponse;
    });
  }

}
