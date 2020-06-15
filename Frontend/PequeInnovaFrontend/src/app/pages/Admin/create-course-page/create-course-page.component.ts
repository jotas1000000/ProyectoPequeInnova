import { Component, OnInit } from '@angular/core';
import { FilterStatusPipe } from './../../../Pipes/pipeFilter/filter-status.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Question} from './../../../core/models/Question.model';
import {Course} from './../../../core/models/Course.model';
import {LessonN} from './../../../core/models/LessonN.model';
import {CourseService} from './../../../core/services/course/course.service';
import {LessonService} from './../../../core/services/lesson/lesson.service';
import {QuestionService} from './../../../core/services/question/question.service';
import {ResponseId} from './../../../core/models/ResponseId.model';
import { Router, ActivatedRoute } from '@angular/router';

import { Lesson } from 'src/app/models/Lesson';
//import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {

  form: FormGroup;

  ColorEditable: any = 'white';
  colorw: any = 'white';
  ColorformQ: any = 'white';
  ColorformQContainer: any = 'white';

  StateEdit: boolean;
  StateAdd: boolean;
  StateSleep: boolean;

  typeLesson: boolean;
  typePractice: boolean;

  QuestionAdd: boolean;
  QuestionEdit: boolean;

  questions: Question[] = null;
  questionAux: Question;

  StateRequest: string = '';
  StateProcesing: string = '';

  StateRequestBoolean: boolean = false;


  get stateSleep(): boolean{
    return this.StateSleep;
  }

  get stateAdd(): boolean{
    return this.stateAdd;
  }

  get stateEdit(): boolean{
    return this.stateEdit;
  }

  get questionAdd(): boolean{
    return this.QuestionAdd;
  }

  course: Course = {
    id: 1,
    name: '',
    description: '',
    image: '',
    uid: '123',
    state: true,
    status: true,
    updateDate: '1988-10-10T00:00:00',
    createDate: '1988-10-10T00:00:00',
    areaId: 1,
    inscriptions: null,
    teachings: null,
    lessons: []
  };

  titleLesson: string;
  urlVideo: string;
  knowledgePrevious: string;
  Description: string;
  editField: string;

  titleLessonComparative: string;
  urlVideoComparative: string;
  knowledgePreviousComparative: string;
  DescriptionComparative: string;
  editFieldComparative: string;

  Question: string ;
  trueanswer: string ;
  falseanswer1: string ;
  falseanswer2: string ;
  falseanswer3: string ;

  QuestionCompare: string ;
  trueanswerCompare: string ;
  falseanswer1Compare: string ;
  falseanswer2Compare: string ;
  falseanswer3Compare: string ;

  lessonAux: LessonN;

  remove(value: LessonN) {

    const pos = this.course.lessons.indexOf(value);
    this.course.lessons[pos].status = false;
    this.course.lessons.splice(pos, 1);

    this.questions = null;
    this.questionAux = null;
    this.functionCleanAllInputs();
  }

  addLessonVideo() {

    this.questionAux = null;
    this.questions = null;
    this.StateAdd = true;
    this.StateEdit = false;
    this.StateSleep = false;

    this.typeLesson = true;
    this.typePractice = false;

    this.QuestionAdd = false;
    this.QuestionEdit  = false;

    this.ColorEditable = 'rgb(198,216,29,0.6)';
    this.ColorformQContainer = 'white';

    this.functionCleanAllInputs();
  }

  addPractice(){
    this.functionCleanAllInputs();
    this.questions = null;
    this.questionAux = null;
    this.ColorformQContainer = 'rgb(198,216,29,0.6)';
    this.ColorEditable = 'white';

    this.StateAdd = true;
    this.StateEdit = false;
    this.StateSleep = false;

    this.typeLesson = false;
    this.typePractice = true;

    this.QuestionAdd = false;
    this.QuestionEdit  = false;
  }

  AddQuestion(){
    if (this.questions == null){
      this.questions = [];
    }
    this.ColorformQ = 'rgb(198,216,29)';
    this.QuestionAdd = true;
    this.QuestionEdit = false;
    this.Question = '';
    this.trueanswer = '';
    this.falseanswer1 = '';
    this.falseanswer2 = '';
    this.falseanswer3 = '';
  }

  FunctionShow(value: LessonN){
    this.functionCleanAllInputs();
    if (this.StateAdd !== true){

      this.StateAdd = false;
      this.StateEdit = true;
      this.StateSleep = false;

      if (value.type === 'lesson')
      {
        this.typeLesson = true;
        this.typePractice = false;

        this.QuestionAdd = false;
        this.QuestionEdit  = false;

        this.ColorformQContainer = 'white';
        this.ColorEditable = 'rgba(130,177,255,0.6)';

        this.lessonAux = value;
        this.titleLesson = value.title;
        this.urlVideo = value.urlVideo;
        this.knowledgePrevious = value.id.toString();
        this.Description = value.description;

        this.titleLessonComparative = value.title;
        this.urlVideoComparative = value.urlVideo;
        this.knowledgePreviousComparative = value.id.toString();
        this.DescriptionComparative = value.description;
        this.questions = null;
        this.questionAux = null;

      }else if (value.type === 'practice')
      {
        this.ColorformQContainer = 'rgba(130,177,255,0.6)';
        this.questions = value.questions;
        this.typeLesson = false;
        this.typePractice = true;

        this.QuestionAdd = false;
        this.QuestionEdit  = false;

        this.ColorEditable = 'white';
      }

    }

    console.log(`${value.id} ${value.order}`);
  }


  functionShowQuestion(value: Question){

    this.questionAux = value;
    this.QuestionAdd = false;
    this.QuestionEdit = true;
    this.ColorformQ = 'rgb(130,177,255)';
    this.Question = value.question;
    this.trueanswer = value.trueAnswer;
    this.falseanswer1 = value.falseAnswer1;
    this.falseanswer2 = value.falseAnswer2;
    this.falseanswer3 = value.falseAnswer3;

    this.QuestionCompare = value.question;
    this.trueanswerCompare = value.trueAnswer;
    this.falseanswer1Compare = value.falseAnswer1;
    this.falseanswer2Compare = value.falseAnswer2;
    this.falseanswer3Compare = value.falseAnswer3;

    console.log(value);

  }

  showCourse(){
    console.log(this.course);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  FunctionButtonUp(value: LessonN){

    const pos = this.course.lessons.indexOf(value);
    if (pos > 0){

      const aux = this.course.lessons[pos - 1];
      const ordermenor = this.course.lessons[pos - 1].order;
      aux.order = this.course.lessons[pos].order;
      this.course.lessons[pos - 1] = this.course.lessons[pos];
      this.course.lessons[pos - 1].order = ordermenor;
      this.course.lessons[pos] = aux;
    }else{
      console.log('no pee');
    }

  }

  FunctionButtonDown(value: LessonN){

    const pos = this.course.lessons.indexOf(value);
    if (this.course.lessons.length !== pos + 1){

      const aux = this.course.lessons[pos + 1];
      const ordermenor = this.course.lessons[pos + 1].order;
      aux.order = this.course.lessons[pos].order;
      this.course.lessons[pos + 1] = this.course.lessons[pos];
      this.course.lessons[pos + 1].order = ordermenor;
      this.course.lessons[pos] = aux;
    }else{
      console.log('no pee');
    }

  }


  AceptButtonLessonCard(){

    if (this.StateEdit === true && this.typeLesson === true){

        if (this.titleLesson !== this.titleLessonComparative ||
            this.urlVideo !== this.urlVideoComparative ||
            this.knowledgePrevious !== this.knowledgePreviousComparative ||
            this.Description !== this.DescriptionComparative){
              const pos = this.course.lessons.indexOf(this.lessonAux);
              this.course.lessons[pos].title = this.titleLesson;
              this.course.lessons[pos].urlVideo = this.urlVideo;
              this.course.lessons[pos].description = this.Description;

            }
        this.lessonAux = null;
        this.ColorEditable = 'white';

    }else if (this.StateAdd === true && this.typeLesson === true){
          let posLesson = 0;
          let orderLesson = 0;
          if (this.course.lessons.length === 0){
            posLesson = 1;
            orderLesson = 0;
          }else{
            posLesson = this.course.lessons[this.course.lessons.length - 1].id + 1;
            orderLesson = this.course.lessons[this.course.lessons.length - 1].order + 1;
          }
          this.course.lessons.push({
          id: posLesson,
          title: this.titleLesson,
          document: 'Aqui',
          urlVideo: this.urlVideo,
          description: this.Description,
          type: 'lesson',
          order: orderLesson,
          uid: '123',
          state: true,
          status: true,
          updateDate: '1988-10-10T00:00:00',
          createDate: '1988-10-10T00:00:00',
          courseId: this.course.id,
          comments: [],
          questions: []
        });
      }
    this.ColorEditable = 'white';

    this.titleLesson = '';
    this.urlVideo = '';
    this.knowledgePrevious = '';
    this.Description = '';

    this.StateAdd = false;
    this.StateEdit = false;
    this.StateSleep = true;

    this.typeLesson = false;
    this.typePractice = false;

    this.QuestionAdd = false;
    this.QuestionEdit = false;

  }

  CancelButtonLessonCard(){

    this.StateAdd = false;
    this.StateEdit = false;
    this.StateSleep = true;

    this.typeLesson = false;
    this.typePractice = false;

    this.QuestionAdd = false;
    this.QuestionEdit  = false;

    this.ColorEditable = 'white';
    this.titleLesson = '';
    this.urlVideo = '';
    this.knowledgePrevious = '';
    this.Description = '';
    this.typeLesson = false;
    this.typePractice = false;
    this.lessonAux = null;

  }

  FunctionSavePractice(){
    console.log(this.questions);
    let posPractice = 0;
    let orderPractice = 0;
    if (this.typePractice === true && this.StateAdd === true){
      if (this.course.lessons.length === 0){
        posPractice = 1;
        orderPractice = 0;
      }else{
        posPractice = this.course.lessons[this.course.lessons.length - 1].id + 1;
        orderPractice = this.course.lessons[this.course.lessons.length - 1].order + 1;
      }

      this.course.lessons.push(
        {
          id: posPractice,
          title: 'Examen',
          document: 'ninguno',
          urlVideo: 'ninguno',
          description: 'ninguno',
          type: 'practice',
          order: orderPractice,
          uid: '123',
          state: true,
          status: true,
          updateDate: '1988-10-10T00:00:00',
          createDate: '1988-10-10T00:00:00',
          courseId: this.course.id,
          comments: [],
          questions: this.questions
        }
      );
    }else if (this.typePractice === true && this.StateEdit === true){

    }

    this.questionAux = null;
    this.questions = null;

    this.StateSleep = true;
    this.StateAdd = false;
    this.StateEdit = false;

    this.typeLesson = false;
    this.typePractice = false;

    this.QuestionAdd = false;
    this.QuestionEdit = false;

    this.ColorformQContainer = 'white';
    this.functionCleanAllInputs();
  }

  FunctionDeclinePractice(){
    this.StateSleep = true;
    this.StateEdit = false;
    this.StateAdd = false;

    this.typeLesson = false;
    this.typePractice = false;

    this.QuestionAdd = false;
    this.QuestionEdit = false;

    this.questionAux = null;

    this.questions = null;

    this.ColorformQContainer = 'white';

    this.functionCleanAllInputs();
  }

  functionCleanAllInputs(){
    this.Question = '';
    this.trueanswer = '';
    this.falseanswer1 = '';
    this.falseanswer2 = '';
    this.falseanswer3 = '';

    this.QuestionCompare = '';
    this.trueanswerCompare = '';
    this.falseanswer1Compare = '';
    this.falseanswer2Compare = '';
    this.falseanswer3Compare = '';

    this.titleLesson = '';
    this.urlVideo = '';
    this.knowledgePrevious = '';
    this.Description = '';

    this.titleLessonComparative = '';
    this.urlVideoComparative = '';
    this.knowledgePreviousComparative = '';
    this.DescriptionComparative = '';

  }

  areaId:number;

  ngOnInit(): void {
    this.setRouteVariables();
    console.log(this.areaId);

    this.course.areaId=this.areaId;
    console.log("eeeeeeeee" + this.course.areaId);
  }


  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
  
      console.log(params);
      console.log("AAAAAAAA" + this.areaId);

    });
  }
  constructor( private courseService: CourseService,
               private lessonService: LessonService,
               private questionService: QuestionService,
               private formBuilder: FormBuilder,
               private router: Router,
               private activatedRoute: ActivatedRoute

  ) {
    
    this.StateEdit = false;
    this.StateAdd = false;
    this.StateSleep = true;

    this.typePractice = false;
    this.typeLesson = false;
    this.questionAux = { id: 0, question: '', trueAnswer: '', falseAnswer1: '', falseAnswer2: '', falseAnswer3: '', status: true, state:true, uid: '' };
    this.QuestionAdd = false;
    this.QuestionEdit = false;

    this.buildForm();

  }
  functionList(): Array<Question>{
    return this.questions;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      Question: ['', [Validators.required]],
      trueanswer: ['', [Validators.required]],
      falseanswer1: ['', [Validators.required]],
      falseanswer2: ['', [Validators.required]],
      falseanswer3: ['', [Validators.required]],
    });
  }

  saveQuestion(event: Event) {
    event.preventDefault();

    if(this.QuestionAdd === true && this.typePractice === true)
    {

      let idAdd: number;
      if (this.form.valid) {

        if (this.questions.length === 0){

          console.log(1);
          idAdd = 1;

        }else
        {
          idAdd = this.questions[this.questions.length - 1].id + 1;
        }

        this.questions.push(
          {
            id: idAdd,
            question: this.form.value.Question,
            trueAnswer : this.form.value.trueanswer,
            falseAnswer1 : this.form.value.falseanswer1,
            falseAnswer2 : this.form.value.falseanswer2,
            falseAnswer3 : this.form.value.falseanswer3,
            status : true,
            state : true,
            //En la linea de abaojo poner Id de la session activa
            uid : '123'
          }
        );
      }

    }else if (this.QuestionEdit === true && this.typePractice === true)
    {
        if (this.Question !== this.QuestionCompare ||
           this.trueanswer !== this.trueanswerCompare ||
           this.falseanswer1 !== this.falseanswer1Compare ||
           this.falseanswer2 !== this.falseanswer2Compare ||
           this.falseanswer3 !== this.falseanswer3Compare
          ){
            const pos = this.questions.indexOf(this.questionAux);
            this.questions[pos].question = this.Question;
            this.questions[pos].trueAnswer = this.trueanswer;
            this.questions[pos].falseAnswer1 = this.falseanswer1;
            this.questions[pos].falseAnswer2 = this.falseanswer2;
            this.questions[pos].falseAnswer3 = this.falseanswer3;
        }
    }
    if (this.QuestionEdit || this.QuestionAdd){

      this.QuestionAdd = false;
      this.QuestionEdit = false;
      this.ColorformQ = 'white';
      this.questionAux = null;
      this.Question = '';
      this.trueanswer = '';
      this.falseanswer1 = '';
      this.falseanswer2 = '';
      this.falseanswer3 = '';
    }
  }

  DeclineCreateQuestion(){

    this.QuestionAdd = false;
    this.QuestionEdit = false;

    this.ColorformQ = 'white';
    this.questionAux = null;
    this.Question = '';
    this.trueanswer = '';
    this.falseanswer1 = '';
    this.falseanswer2 = '';
    this.falseanswer3 = '';
  }

  RemoveQuestion(value: Question){
    const pos = this.questions.indexOf(value);
    this.QuestionAdd = false;
    this.QuestionEdit = false;
    this.ColorformQ = 'white';
    this.questions.splice(pos, 1);
    this.questionAux = null;
    this.Question = '';
    this.trueanswer = '';
    this.falseanswer1 = '';
    this.falseanswer2 = '';
    this.falseanswer3 = '';
  }

  FunctionAceptRequest(){

    if (this.StateRequestBoolean){

      this.router.navigate(['./mainAdmin']);
    }
  }
  Validate(){
    if (this.course.name === '' || this.course.description === '' || this.course.image === ''){
      this.StateRequest = 'Agrege datos al curso';
      this.StateProcesing = 'Datos Faltantes';
    } else if (this.course.lessons.length === 0){
      this.StateRequest = 'Agrege lecciones al curso';
      this.StateProcesing = 'Datos Faltantes';
    } else if (this.course.lessons.length > 0 && this.course.lessons[this.course.lessons.length - 1].type === 'lesson'){
      this.StateRequest = 'El curso debe tener un examen final';
      this.StateProcesing = 'Datos Faltantes';
    } else{
      this.StateRequest = '......';
      this.StateProcesing = 'Procesando.....';
      console.log(this.course);
      this.courseService.registerNewCourse(this.course).subscribe((respCourseId: ResponseId) => {
            console.log(respCourseId.id);

            this.course.lessons.forEach(Lessonelement => {

                this.lessonService.registerNewLesson(Lessonelement, this.course.areaId, respCourseId.id)
                .subscribe((respLessonId: ResponseId) => {
                  if (Lessonelement.type === 'practice'){
                    Lessonelement.questions.forEach(Questionelement => {
                      this.questionService.registerNewQuestion(Questionelement, this.course.areaId, respCourseId.id, respLessonId.id)
                      .subscribe(() => {});
                    });
                  }
              });

            });
            this.StateRequest = 'Curso Creado con Exito!!';
            this.StateProcesing = 'Proceso finalizado.';
            this.StateRequestBoolean = true;

      });

    }
  }

}