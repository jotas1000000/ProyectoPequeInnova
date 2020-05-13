import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { CourseService } from 'src/app/services/course.service';
import { LessonService } from 'src/app/services/lesson.service';
import { SectionService } from 'src/app/services/section.service';

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
    private activatedRoute: ActivatedRoute) { }

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

  ngOnInit(): void {
    
    this.setRouteVariables();
    this.setCourseData();
    this.setAreaData();
    this.setLessonsData();
    console.log("rrrrrrrrrrrr" + this.lessons);
  }

  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
      this.courseId = params['courseId'];
      // this.sectionId = params ['sectionId'];
      console.log(params);
      console.log("AAAAAAAA" + this.areaId);
      console.log("BBBBBBBB" + this.courseId);
    });
  }
  private setLessonsData(): void {
    this.lessonsService.getLessonList(this.areaId,this.courseId)
      .subscribe(data => this.lessons = data);
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


  getThumb(lesson):string{
    var thumb = lesson.urlVideo.slice(30)
    var url = 'http://img.youtube.com/vi/' + thumb + '/maxresdefault.jpg';
    return url
  }


}
