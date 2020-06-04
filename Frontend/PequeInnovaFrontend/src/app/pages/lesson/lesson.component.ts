import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';
import { CourseService } from 'src/app/services/course.service';
import { SectionService } from 'src/app/services/section.service';
import { LessonService } from 'src/app/services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from 'src/app/models/Lesson';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/core/models/User.model';
import { Comment } from 'src/app/models/Comment';
import { CommentService } from 'src/app/services/comment.service';

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
    public commentService: CommentService,
    private router: Router,
    private authenticationService: AuthenticationService) { }

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
  lessonPage: number;
  sanitizer2: any;
  
  //Comment vars
  myComment : Comment = new Comment();
  newComment: string;


  //User vars
  user:User= null;
  userId:string=null;
  userName:string=null;
  
  ngOnInit(): void {
    
    this.user = this.authenticationService.currentUserValue;
    if (this.user){
      this.userId= this.user.id;
      this.userName= this.user.name + ' ' + this.user.lastName;
    }

    this.lessonPage=1;
 
    this.setRouteVariables();
    this.setCourseData();
    this.getLessonsWithCommentsData();
    /*this.setAreaData();
    this.setSectionData(); */
    //this.getLessonsData();
    // this.getLessonData();

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

  private getLessonsWithCommentsData(): void {
    this.lessonsService.getLessonsWithComments(this.areaId,this.courseId)
      .subscribe(data =>{ this.lessons = data;
        console.log(data[0])});
  }

  getLessonData(): void {
    this.lessonsService.getLesson(this.areaId,this.courseId,this.lessonId)
      .subscribe(data => this.mainLesson = data);
  }

  
  getTrustedYouTubeUrl(linkedVideo:Lesson) {
    return this.sanitizer2.bypassSecurityTrustResourceUrl(linkedVideo.urlVideo);
  }    

  postComment(nComment: string){
    console.log(this.userId);
    console.log(this.userName);
    console.log (this.lessonId);
    console.log(nComment);
    console.log(this.newComment);
    this.myComment.userId = this.userId;
    this.myComment.userName = this.userName;
    this.myComment.lessonId = this.lessonId;
    this.myComment.description = this.newComment;
    this.commentService.postComment(this.myComment).subscribe();
  }

  private setCourseData(): void {
    this.coursesService.getCourseList(this.areaId)
      .subscribe(data => {
        this.courses = data;
        for (const course of data) {
          if (course.id == this.courseId) {
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
  

}
