import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { CourseService } from 'src/app/services/course.service';
import { LessonService } from 'src/app/services/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Lesson } from 'src/app/models/Lesson';
import { TestService } from 'src/app/services/test.service';
import { StudentService } from 'src/app/core/services/student/student.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/core/models/User.model';
import { Aprove } from 'src/app/models/Aprove';
import { FooterComponent } from 'src/app/components/footer/footer.component';

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
    public sanitizer: DomSanitizer,
    private studentService:StudentService,
    private authenticationService: AuthenticationService) { }

  public courses = []; 
  public areas = [];
  public lessons = [];
  public questions = [];
  public answers = [];
  public lesson :any;
  public aproveTest : Array<Aprove> = [];

  // lesson vars
  lessonTitle: string;
  lessonDescription: string;

  // Route vars
  areaId: number;
  courseId: number;
  lessonId: number;

  // Area vars
  areaName: string;
  courseName: string;
  lessonName: string;
  slides: any = [];

  //Test Aprove
  idInscription : number ;
  totalQuestions: number = 0;
  totalTrueQuestions: number = 0;
  aprovePractice: boolean = false;

  //User vars
  user:User= null;
  userId:string=null;
  userName:string=null;
  userRol: string= null;
  
  ngOnInit(): void {
    this.setUserVariables();
    this.setRouteVariables();
    this.setCourseData();
    this.setInscriptions();
    this.getLessonsData();
    this.getLessonData();
    this.getTestsData();
    this.getAnswersData();
  }


  private setUserVariables(): void{
    this.user = this.authenticationService.currentUserValue;
    if (this.user){
      this.userId= this.user.id;
      this.userName= this.user.name + ' ' + this.user.lastName;
      this.userRol= this.user.role;
    }
  }
  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
      this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
    });
  }

  private getAnswersData(): void {
    this.testsService.getAnswersList(this.areaId,this.courseId,this.lessonId)
      .subscribe(data =>{ 
        this.answers = data; 
        this.aproveTest
        this.totalQuestions = data.length;
        for (let question of data) {
            this.aproveTest.push({id : question.question, state:false});
        }
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
      .subscribe(data =>{ 
        this.lesson = data; 
        this.lessonTitle = data.title;
        this.lessonDescription = data.description;
      });
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

  setInscriptions(){
    this.studentService.getInscriptions(this.userId)
    .subscribe(data => {
      for (const inscrip of data) {
        if (inscrip.courseId == this.courseId) {
            this.idInscription = inscrip.id;
            console.log(this.idInscription);
          break;
        }
      }
    });
  }

  checkAnswer( quest:string , trueAnswer:boolean){
    this.aproveTest.forEach((e,index)=>{
      if(e.id == quest){
        if(trueAnswer){
         
          this.aproveTest[index].state=true;
        }else{
          this.aproveTest[index].state=false;
        }
      }
    });
  }

  verifyTest(){
    var totalTrueQ = 0;
    var aproveBoolean = false;

    for (let q of this.aproveTest){
      if(q.state){
        totalTrueQ ++;
      } 
    } 
    
    if(totalTrueQ > (this.totalQuestions / 2) ){
        aproveBoolean = true;
        console.log(this.idInscription);
        this.studentService.putAproveTest(this.idInscription).subscribe();
    } 
    this.aprovePractice = aproveBoolean;
    this.totalTrueQuestions = totalTrueQ;
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

 
}