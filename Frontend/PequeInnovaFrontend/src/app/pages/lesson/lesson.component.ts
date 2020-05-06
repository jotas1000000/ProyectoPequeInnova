import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { CourseService } from 'src/app/services/course.service';
import { SectionService } from 'src/app/services/section.service';
import { LessonService } from 'src/app/services/lesson.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  constructor(  private areasService: AreaService,
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
  slides: any = [];

  ngOnInit(): void {
    this.slides = this.comments;
    this.setRouteVariables();
   /*  this.setCourseData();
    this.setAreaData();
    this.setSectionData(); */
   // this.setLessonsData();
  }

  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
      this.courseId = params['courseId'];
      this.sectionId = params ['sectionId'];
      this.lessonId = params['lessonId'];
      console.log(params);
      console.log("AAAAAAAA" + this.areaId);
      console.log("BBBBBBBB" + this.courseId);
    });
  }

  private setLessonsData(): void {
    this.lessonsService.getLessonList(this.areaId,this.courseId,this.sectionId)
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
  comments = [
    {
      user: 'Pepito Perez',
      comments: 'Buen video Profe Rubius',
    },
    {
      user: 'Pedrito Jimenez',
      comments: 'Como se llama el alimento de los patos?',
    },
    {
      user: 'Juancito Mendez',
      comments: 'Creo que es Pancito',
    },
    {
      user: 'Pepito Perez',
      comments: 'Creo que era Maiz',
    },
    {
      user: 'Pedrito Jimenez',
      comments: 'Gracias Juancito!',
    },
    {
      user: 'Profe Rubius',
      comments: 'El alimento de los patitos eran limones 4k. Gracias chicoz.',
    }
  ];

}
