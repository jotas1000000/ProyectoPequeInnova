import { Component, OnInit } from '@angular/core';
import { AssignmentR } from './../../../core/models/AssignmentR.model';
import { TeacherService } from './../../../core/services/teacher/teacher.service';
import { AuthenticationService } from './../../../core/services/authentication/authentication.service';
import { CourseService } from './../../../core/services/course/course.service';
import { Area } from './../../../core/models/Area.model';
import { Course } from './../../../core/models/Course.model';
import { User } from 'src/app/core/models/User.model';
@Component({
  selector: 'app-course-teacher-owner',
  templateUrl: './course-teacher-owner.component.html',
  styleUrls: ['./course-teacher-owner.component.scss']
})
export class CourseTeacherOwnerComponent implements OnInit {
  areas: Array<Area>;
  courses: Array<Course>;
  user: User;
  assignment: any;
  courseRequest: Course;
  constructor(private teacherService: TeacherService,
              private authenticationService: AuthenticationService, 
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    if (this.user) {
      this.teacherService.getAssignmentTeacher(this.user.id).subscribe(response => {
        this.assignment = response;
        this.courseService.getCourseByOwner(this.user.id).subscribe((CoursesResponses) => {
          this.courses = CoursesResponses;
        });
      });
    }
  }

  DeleteCourse(value: Course) {
    this.courseRequest = value;
  }

  confirmCourseDelete() {
    this.courseService.deleteCourse(this.courseRequest).subscribe((response) => {
      if (response) {
        this.courseService.getCourseByOwner(this.user.id).subscribe((CoursesResponses) => {
          this.courses = CoursesResponses;
        });
      }
    }, error => {
      alert('Ups algo salio mal, intente de nuevo. Si el problema persiste contactese con Soporte Tenico!');
    });
    this.courseRequest = null;
  }

}