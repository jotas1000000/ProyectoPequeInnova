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
    private sectionsService: SectionService,
    private lessonsService: LessonService,
    private activatedRoute: ActivatedRoute) { }

  public courses = [];
  public areas = [];
  public sections = [];
  public lessons = [];

  // Route vars
  areaId: number;
  courseId: number;
  sectionId: number;
  lessonId: number;

  // Area vars
  areaName: string;
  courseName: string;
  lessonName: string;

  ngOnInit(): void {
    
    this.setRouteVariables();
    this.setCourseData();
    this.setAreaData();
    this.setSectionData();
   // this.setLessonsData();
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

  getLessonsData(id: number): void{
    this.lessonsService.getLessonList(this.areaId, this.courseId, id)
       .subscribe(data => this.lessons = data);

  }

  private setSectionData(): void {
    this.sectionsService.getSectionList(this.areaId, this.courseId)
      .subscribe(data => {
        this.sections = data;
        console.log("CCCCCCCCCC" + this.sections);
      });
  }

  private setCourseData(): void {
    this.coursesService.getCourseList(this.areaId)
      .subscribe(data => {
        this.courses = data;
        for (const course of data) {
          if (course.Id == this.areaId) {
            this.courseName = course.Name;
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
    var thumb = lesson.video.slice(30)
    var url = 'http://img.youtube.com/vi/' + thumb + '/default.jpg';
    return url
  }


}
