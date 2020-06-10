import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { CourseService } from 'src/app/services/course.service';
import { LessonService } from 'src/app/services/lesson.service';
import { SectionService } from 'src/app/services/section.service';
import { NumberValueAccessor } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/core/models/User.model';
import { Inscription } from 'src/app/models/Inscription';
import { StudentService } from 'src/app/services/student.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(
    private areasService: AreaService,
    private coursesService: CourseService,
    private lessonsService: LessonService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private authenticationService: AuthenticationService) { }

  public courses = [];
  public areas = [];
  public lessons = [];

  // Route vars
  areaId: number;
  courseId: number;
  lessonId: number;

  // Area vars
  areaName: string;
  courseName: string;
  courseDescription: string;
  lessonName: string;

  // Search vars
  searchText:string;

  // Lesson vars
  elements:number;
  totalLessons:number;

  //User vars
  inscription:Inscription = new Inscription();
  user:User= null;
  userId:string=null;
  
  ngOnInit(): void {
    
    this.setDataUser();
    this.setRouteVariables();
    this.setCourseData();
    this.setAreaData();
    this.setLessonsData();
    
    this.elements  = 4;
  
  }

  private setDataUser(){
    this.user = this.authenticationService.currentUserValue;
    if (this.user){
      this.userId= this.user.id;
    }
  }

  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
      this.courseId = params['courseId'];
    });
  }
  private setLessonsData(): void {
    this.lessonsService.getLessonList(this.areaId,this.courseId)
    .subscribe(data => {
      this.lessons = data;
      this.totalLessons = data.length
    });
  }
 


  private setCourseData(): void {
    this.coursesService.getCourseList(this.areaId)
      .subscribe(data => {
        this.courses = data;
        for (const course of data) {
          if (course.id == this.courseId) {
            this.courseName = course.name;
            this.courseDescription = course.description;
            break;
          }
        }
      });
  }


  private setAreaData(): void {
    this.areasService.getAreaList()
      .subscribe(data => {
          this.areas = data;
          for (const area of data) {
            if (area.id == this.areaId) {
              this.areaName = area.name;
              break;
            }
          }
        });
  }

  inscriptionStudent(): void{
    this.inscription.courseId = this.courseId;
    this.inscription.userId = this.userId;

    this.studentService.inscription(this.inscription).subscribe();
  }

  getThumb(lesson):string{
    var thumb = lesson.urlVideo.slice(30)
    var url = 'http://img.youtube.com/vi/' + thumb + '/maxresdefault.jpg';
    return url
  }

  see(){
    this.elements=this.elements+4;
  }

  seeMore(){
    this.elements=this.totalLessons;
  }

}
