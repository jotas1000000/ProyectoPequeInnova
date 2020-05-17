import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { CourseService } from 'src/app/services/course.service';
import { SectionService } from 'src/app/services/section.service';
import { LessonService } from 'src/app/services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/models/Lesson';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  

  constructor(  private areasService: AreaService,
    private coursesService: CourseService,
    private lessonsService: LessonService,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private router: Router) { }

  public courses = [];
  public areas = [];
  public lessons = [];
  public mainLesson : any;

  // Route vars
  areaId: number;
  courseId: number;
  lessonId: number;

  // Area vars
  areaName: string;
  courseName: string;
  lessonName: string;
  slides: any = [];

  //Lesson vars
  page : number;
  lessonPage: number;
  sanitizer2: any;


  
  ngOnInit(): void {
    
    this.lessonPage=1;
    this.slides = this.comments;
    this.setRouteVariables();
    this.setCourseData();
    /*this.setAreaData();
    this.setSectionData(); */
    this.getLessonsData();
    // this.getLessonData();
    this.page = 0;
    console.log("BBBBBBBB" + this.courseId);
    console.log("YYYYYYYYY" + this.lessonId);
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
      this.getLessonData();
    });
   
  }

  private getLessonsData(): void {
    this.lessonsService.getLessonList(this.areaId,this.courseId)
      .subscribe(data => this.lessons = data);
  }

  getLessonData(): void {
    this.lessonsService.getLesson(this.areaId,this.courseId,this.lessonId)
      .subscribe(data => this.mainLesson = data);
  }

  nextPage(id:number): void {
    console.log("ttttttttt" + id);
    this.router.navigate([` areas/${this.areaId}/courses/${this.courseId}/lessons/${id}/theoretical`]);
    this.page++;
  }
  refresh(): void {
    window.location.reload();
  }
  previousPage():void{
    this.page--;
  }
  
  getTrustedYouTubeUrl(linkedVideo:Lesson) {
    return this.sanitizer2.bypassSecurityTrustResourceUrl(linkedVideo.urlVideo);
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
