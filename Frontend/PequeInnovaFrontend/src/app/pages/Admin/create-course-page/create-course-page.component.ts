import { Component, OnInit } from '@angular/core';
import { FilterStatusPipe } from './../../../Pipes/pipeFilter/filter-status.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Question} from './../../../core/models/Question.model';
import {Course} from './../../../core/models/Course.model';
import {LessonN} from './../../../core/models/LessonN.model';
import { CourseService } from 'src/app/services/course.service';
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
  
  StateEdit: boolean;
  StateAdd: boolean;
  StateSleep: boolean;

  typeLesson: boolean;
  typePractice: boolean;

  typePracticeAdd: boolean;
  typePracticeEdit: boolean;

  questions: Question[] = [];
  questionAux: Question;


  get stateSleep(): boolean{
    return this.StateSleep;
  }

  get stateAdd(): boolean{
    return this.stateAdd;
  }

  get stateEdit(): boolean{
    return this.stateEdit;
  }

  get TypePracticeAdd(): boolean{
    return this.typePracticeAdd;
  }

  course: Course = {
    id: 1,
    name: 'Calculo',
    description: 'Esta es una materia Universitaria',
    image: 'Aqui viene una image',
    uid: '123',
    state: true,
    status: true,
    updateDate: '1988-10-10T00:00:00',
    createDate: '1988-10-10T00:00:00',
    areaId: 1,
    inscriptions: [],
    teachings: [],
    lessons: [
      {
        id: 2,
        title: 'Conociendo las constantes',
        document: 'Aqui',
        urlVideo: 'http//algo.com',
        description: 'En esta leccion avanzaremos sobre las constantes',
        type: 'lesson',
        order: 0,
        uid: '123',
        state: true,
        status: true,
        updateDate: '1988-10-10T00:00:00',
        createDate: '1988-10-10T00:00:00',
        courseId: 1,
        comments: [],
        questions: []
      },
      {
        id: 3,
        title: 'Conociendo las variables',
        document: 'Aqui',
        urlVideo: 'http//algo.com',
        description: 'En esta leccion avanzaremos sobre las variables',
        type: 'lesson',
        order: 1,
        uid: '123',
        state: true,
        status: true,
        updateDate: '1988-10-10T00:00:00',
        createDate: '1988-10-10T00:00:00',
        courseId: 1,
        comments: [],
        questions: []
      }

    ]
  }

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



  personList: Array<any> = [
    { id: 1, name: 'Aurelia Vega', order: 0 , status: true},
    { id: 2, name: 'Guerra Cortez', order: 1 , status: true},
    { id: 3, name: 'Guadalupe House', order: 2, status: true},
    { id: 4, name: 'Tomatas Vega', order: 3, status: true},
    { id: 5, name: 'Elisa Gallagher', order: 4 , status: true},
  ];

  awaitingPersonList: Array<any> = [
    { id: 6, name: 'George Vega', order:5,status:true},
    { id: 7, name: 'Mike Low', order:6 ,status:true},
    { id: 8, name: 'John Derp', order:7 ,status:true},
    { id: 9, name: 'Anastasia John', order:8,status:true },
    { id: 10, name: 'John Maklowicz', order:9,status:true},
  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(value: LessonN) {

    const pos = this.course.lessons.indexOf(value);
    this.course.lessons[pos].status = false;
    this.course.lessons.splice(pos, 1);
    this.titleLesson = '';
    this.urlVideo = '';
    this.knowledgePrevious = '';
    this.Description = '';


   /* const pos = this.personList.indexOf(value);
    this.personList[pos].status = false;
    this.personDeleted.push(this.personList[pos]);
    this.personList.splice(pos, 1);
    console.log(this.personDeleted);
    this.titleLesson = "";
    this.urlVideo = "";
    this.knowledgePrevious = "";
    this.Description = "";*/
    
   /*  this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1); */
   /*  const pos = this.personList.indexOf(value);
    this.personList[pos].status = false;

    console.log(value); */
  }

  addLessonVideo() {
   /*  if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    } */
    this.StateAdd = true;
    this.StateEdit = false;
    this.StateSleep = false;
    this.typeLesson = true;
    this.typePractice = false;
    this.ColorEditable = 'rgb(198,216,29,0.6)';


    this.titleLesson = "";
    this.urlVideo = "";
    this.knowledgePrevious = "";
    this.Description = "";

    this.titleLessonComparative ="";
    this.urlVideoComparative = "";
    this.knowledgePreviousComparative = "";
    this.DescriptionComparative = "";



  }
  addPractice(){
    this.StateAdd = true;
    this.StateEdit = false;
    this.StateSleep = false;
    this.typeLesson = false;
    this.typePractice = true;
  }
  AddQuestion(){
    this.ColorformQ = 'rgb(198,216,29,0.6)';
    this.typePracticeAdd = true;
    this.typePracticeEdit = false;
  }

  FunctionShow(value: LessonN){


    this.StateAdd = false;
    this.StateEdit = true;
    this.StateSleep = false;

    if(value.type === 'lesson')
    {
      this.typeLesson = true;
      this.typePractice = false;
      this.lessonAux = value;
      this.titleLesson = value.title;
      this.urlVideo = value.urlVideo;
      this.knowledgePrevious = value.id.toString();
      this.Description = value.description;
  
      this.titleLessonComparative = value.title;
      this.urlVideoComparative = value.urlVideo;
      this.knowledgePreviousComparative = value.id.toString();
      this.DescriptionComparative = value.description;

    }else
    {
      this.questions = value.questions;
      this.typeLesson = false;
      this.typePractice = true;
    }

    this.ColorEditable = 'rgba(130,177,255,0.6)';

    console.log(`${value.id} ${value.order}`);
  }

    

  functionShowQuestion(value: Question){

    this.questionAux = value;
    this.typePracticeAdd = false;
    this.typePracticeEdit = true;
    this.ColorformQ = 'rgba(130,177,255,0.6)';
    this.Question = value.Question;
    this.trueanswer = value.trueanswer;
    this.falseanswer1 = value.falseanswer1; 
    this.falseanswer2 = value.falseanswer2; 
    this.falseanswer3 = value.falseanswer3; 

    this.QuestionCompare = value.Question;
    this.trueanswerCompare = value.trueanswer;
    this.falseanswer1Compare = value.falseanswer1; 
    this.falseanswer2Compare = value.falseanswer2; 
    this.falseanswer3Compare = value.falseanswer3; 

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
    }else{console.log('no pee')}
     /* const pos = this.personList.indexOf(value);
      if (pos > 0){

        const aux = this.personList[pos - 1];
        const ordermenor = this.personList[pos - 1].order;
        aux.order = this.personList[pos].order;
        this.personList[pos - 1] = this.personList[pos];
        this.personList[pos - 1].order = ordermenor;
        this.personList[pos] = aux;
      }else{console.log('no pee')}*/
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
    }else{console.log('no pee')}

    /*const pos = this.personList.indexOf(value);
      if (this.personList.length !== pos + 1){

        const aux = this.personList[pos + 1];
        const ordermenor = this.personList[pos + 1].order;
        aux.order = this.personList[pos].order;
        this.personList[pos + 1] = this.personList[pos];
        this.personList[pos + 1].order = ordermenor;
        this.personList[pos] = aux;
      }else{console.log('no pee')} */
  }


  AceptButtonLessonCard(){

    if(this.StateEdit === true){

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

    }else if (this.StateAdd === true){

        this.course.lessons.push({
          id: 3,
          title: this.titleLesson,
          document: 'Aqui',
          urlVideo: this.urlVideo,
          description: this.Description,
          type: 'lesson',
          order: this.course.lessons[this.course.lessons.length - 1].order + 1,
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

  }
  
  CancelButtonLessonCard(){
    this.StateAdd = false;
    this.StateEdit = false;
    this.StateSleep = true;
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
    const posPractice = this.course.lessons[this.course.lessons.length - 1].id + 1;
    const orderPractice = this.course.lessons[this.course.lessons.length - 1].order + 1;
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
    this.questionAux = null;
    this.questions = [];
    this.StateSleep = true;
    this.StateAdd = false;
    this.StateEdit = false;
    this.typeLesson = false;
    this.typePractice = false;
    this.typePracticeAdd = false;
    this.typePracticeEdit = false;
  }

  FunctionDeclinePractice(){

  }

/*   navigateToPracticeBuilder(){
    setTimeout(() => {
      location.hash = '#' + 'elem';
    }, 1000);
  } */

  ngOnInit(): void {

  }

  constructor(
    private formBuilder: FormBuilder,
  ) {

    this.StateEdit = false;
    this.StateAdd = false;
    this.StateSleep = true;

    this.typePractice = false;
    this.typeLesson = false;
    this.questionAux = { id: 0, Question: '', trueanswer: '', falseanswer1: '', falseanswer2: '', falseanswer3: '' };
    this.typePracticeAdd = false;
    this.typePracticeEdit = false;

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

    if(this.typePracticeAdd)
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
            Question: this.form.value.Question,
            trueanswer : this.form.value.trueanswer,
            falseanswer1 : this.form.value.falseanswer1,
            falseanswer2 : this.form.value.falseanswer2,
            falseanswer3 : this.form.value.falseanswer3
          }
        );
      }

    }else if(this.typePracticeEdit)
    {
        if(this.Question !== this.QuestionCompare ||
           this.trueanswer !== this.trueanswerCompare ||
           this.falseanswer1 !== this.falseanswer1Compare ||
           this.falseanswer2 !== this.falseanswer2Compare ||
           this.falseanswer3 !== this.falseanswer3Compare
          ){
            const pos = this.questions.indexOf(this.questionAux);
            this.questions[pos].Question = this.Question;
            this.questions[pos].trueanswer = this.trueanswer;
            this.questions[pos].falseanswer1 = this.falseanswer1;
            this.questions[pos].falseanswer2 = this.falseanswer2;
            this.questions[pos].falseanswer3 = this.falseanswer3;
        }
    }
    if(this.typePracticeEdit || this.typePracticeAdd){
      
      this.typePracticeAdd = false;
      this.typePracticeEdit = false;
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
    this.typePracticeAdd = false;
    this.typePracticeEdit = false;
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
    this.typePracticeAdd = false;
    this.typePracticeEdit = false;
    this.ColorformQ = 'white';
    this.questions.splice(pos, 1);
    this.questionAux = null;
    this.Question = '';
    this.trueanswer = '';
    this.falseanswer1 = '';
    this.falseanswer2 = '';
    this.falseanswer3 = '';
  }

}


//    background-color: rgba(130,177,255,0.6);

//    background-color: rgb(198,216,29,0.6);

//    background-color: rgba(221, 10, 28, 0.73);
