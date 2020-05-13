import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { CourseService } from 'src/app/services/course.service';
import { LessonService } from 'src/app/services/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Lesson } from 'src/app/models/Lesson';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(  private areasService: AreaService,
    private coursesService: CourseService,
    private lessonsService: LessonService,
    private activatedRoute: ActivatedRoute,
    private testsService: TestService,
    public sanitizer: DomSanitizer) { }

  public courses = [];
  public areas = [];
  public lessons = [];
  public questions = [];
  public lesson :any;

  // Route vars
  areaId: number;
  courseId: number;
  lessonId: number;

  // Area vars
  areaName: string;
  courseName: string;
  lessonName: string;
  slides: any = [];

 

  ngOnInit(): void {
    this.slides = this.questions2;

    this.setRouteVariables();
    this.setCourseData();
    /*this.setAreaData();
    this.setSectionData(); */
    this.getLessonsData();
    this.getLessonData();
    this.getTestsData();
  }

  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
      this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
      console.log(params);
      console.log("AAAAAAAA" + this.areaId);
      console.log("BBBBBBBB" + this.courseId);
      console.log("CCCCCCCC" + this.lessonId);
    });
  }


  
  private getTestsData(): void {
    this.testsService.getQuestionsList(this.areaId,this.courseId,this.lessonId)
      .subscribe(data => this.questions = data);
  }

  private getLessonsData(): void {
    this.lessonsService.getLessonList(this.areaId,this.courseId)
      .subscribe(data => this.lessons = data);
  }

  private getLessonData(): void {
    this.lessonsService.getLesson(this.areaId,this.courseId,this.lessonId)
      .subscribe(data => this.lesson = data);
  }


  private setCourseData(): void {
    this.coursesService.getCourseList(this.areaId)
      .subscribe(data => {
        this.courses = data;
        for (const course of data) {
          if (course.id == this.areaId) {
            this.courseName = course.name;
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
  questions2 = [
    {
      id:"1",
      question: 'Que Comen los patitos?',
      answer1: 'Los patos comen huevos',
      answer2: 'Los patos comen pan',
      answer3: 'Los patos comen a otros patos',
    },
    {
      id:"2",
      question: 'Por que las personas comen murcielagos?',
      answer1: 'Arruimar la vida a todos',
      answer2: 'Porque tenian nada mas que hacer',
      answer3: 'Todas las anteriores',
    },
    {
      id:"3",
      question: 'Pregunta 3',
      answer1: 'Respuesta 1 de la pregunta 3',
      answer2: 'Respuesta 2 de la pregunta 3',
      answer3: 'Respuesta 3 de la pregunta 3',
    },
    {
      id:"4",
      question: 'Pregunta 4',
      answer1: 'Respuesta 1 de la pregunta 4',
      answer2: 'Respuesta 2 de la pregunta 4',
      answer3: 'Respuesta 3 de la pregunta 4',
    },
    { 
      id:"5",
      question: 'Pregunta 5',
      answer1: 'Respuesta 1 de la pregunta 5',
      answer2: 'Respuesta 2 de la pregunta 5',
      answer3: 'Respuesta 3 de la pregunta 5',
    },
    {
      id:"6",
      question: 'Pregunta 6',
      answer1: 'Respuesta 1 de la pregunta 6',
      answer2: 'Respuesta 2 de la pregunta 6',
      answer3: 'Respuesta 3 de la pregunta 6',
    }
  ];

 
}