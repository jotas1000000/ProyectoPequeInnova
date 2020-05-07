import { Component, OnInit } from '@angular/core';
import { FilterStatusPipe } from './../../../Pipes/pipeFilter/filter-status.pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Question} from './../../../core/models/Question.model';
@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {

  form: FormGroup;

  ColorEditable: any = 'white';

  typePractice: boolean;
  typeLesson: boolean;
  StateEdit: boolean;
  StateAdd: boolean;
  StateSleep: boolean;

  get stateSleep(): boolean{
    return this.StateSleep;
  }

  get stateAdd(): boolean{
    return this.stateAdd;
  }

  get stateEdit(): boolean{
    return this.stateEdit;
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

  personDeleted: Array<any> =[];

  questions: Question[] = [
    {
      Question: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      trueanswer: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      falseanswer1: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      falseanswer2: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      falseanswer3: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      Question: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 
      trueanswer: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 
      falseanswer1: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 
      falseanswer2: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', 
      falseanswer3: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    },
    {
      Question: 'ccccccccccccccccccccccccccccccccccccccc', 
      trueanswer: 'ccccccccccccccccccccccccccccccccccccccc', 
      falseanswer1: 'ccccccccccccccccccccccccccccccccccccccc', 
      falseanswer2: 'ccccccccccccccccccccccccccccccccccccccc', 
      falseanswer3: 'ccccccccccccccccccccccccccccccccccccccc'
    },
    {
      Question: 'dddddddddddddddddddddddddddddddddddddddddddd', 
      trueanswer: 'dddddddddddddddddddddddddddddddddddddddddddd', 
      falseanswer1: 'dddddddddddddddddddddddddddddddddddddddddddd', 
      falseanswer2: 'dddddddddddddddddddddddddddddddddddddddddddd', 
      falseanswer3: 'dddddddddddddddddddddddddddddddddddddddddddd'
    },
    {
      Question: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
      trueanswer: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
      falseanswer1: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
      falseanswer2: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
      falseanswer3: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
    },
    {
      Question: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', 
      trueanswer: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', 
      falseanswer1: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', 
      falseanswer2: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq', 
      falseanswer3: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq'
    },
    {
      Question: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', 
      trueanswer: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', 
      falseanswer1: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', 
      falseanswer2: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm', 
      falseanswer3: 'mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm'
    },
    {
      Question: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      trueanswer: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      falseanswer1: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      falseanswer2: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 
      falseanswer3: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    },
  
  ];

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

  remove(value: any) {

    const pos = this.personList.indexOf(value);
    this.personList[pos].status = false;
    this.personDeleted.push(this.personList[pos]);
    this.personList.splice(pos, 1);
    console.log(this.personDeleted);
    this.titleLesson = "";
    this.urlVideo = "";
    this.knowledgePrevious = "";
    this.Description = "";
    
   /*  this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1); */
   /*  const pos = this.personList.indexOf(value);
    this.personList[pos].status = false;

    console.log(value); */
  }

  add() {
   /*  if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    } */
    this.StateAdd = true;
    this.StateEdit = false;
    this.StateSleep = false;

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

  FunctionShow(value: any){

    this.StateAdd = false;
    this.StateEdit = true;
    this.StateSleep = false;

    this.ColorEditable = 'rgba(130,177,255,0.6)';

    console.log(`${value.id} ${value.order}`);
    this.titleLesson = value.id;
    this.urlVideo = value.name;
    this.knowledgePrevious = value.order;
    this.Description = value.status;

    this.titleLessonComparative = value.id;
    this.urlVideoComparative = value.name;
    this.knowledgePreviousComparative = value.order;
    this.DescriptionComparative = value.status;
  }

  
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  FunctionButtonUp(value: any){

      const pos = this.personList.indexOf(value);
      if (pos > 0){

        const aux = this.personList[pos - 1];
        const ordermenor = this.personList[pos - 1].order;
        aux.order = this.personList[pos].order;
        this.personList[pos - 1] = this.personList[pos];
        this.personList[pos - 1].order = ordermenor;
        this.personList[pos] = aux;
      }else{console.log('no pee')}
  }

  FunctionButtonDown(value: any){
      const pos = this.personList.indexOf(value);
      if (this.personList.length !== pos + 1){

        const aux = this.personList[pos + 1];
        const ordermenor = this.personList[pos + 1].order;
        aux.order = this.personList[pos].order;
        this.personList[pos + 1] = this.personList[pos];
        this.personList[pos + 1].order = ordermenor;
        this.personList[pos] = aux;
      }else{console.log('no pee')}
  }


  AceptButtonLessonCard(){

    if(this.StateEdit === true){

        if (this.titleLesson !== this.titleLessonComparative){

          alert('Aceptar Cambios en Title?');

        }else if (this.urlVideo !== this.urlVideoComparative){

          alert('Aceptar Cambios en url?');

        }else if(this.knowledgePrevious !== this.knowledgePreviousComparative){

          alert('Aceptar Cambios en Know?');

        }else if(this.Description !== this.DescriptionComparative){

          alert('Aceptar Cambios en Description?');

        }else
        {
          alert('Usted no ha hecho cambios');
        }

        this.ColorEditable = 'white';

    }else if (this.StateAdd === true){

        this.personList.push({id: this.titleLesson, name:  this.urlVideo , order: this.knowledgePrevious , status: true});
        this.ColorEditable = 'white';

        this.titleLesson = '';
        this.urlVideo = '';
        this.knowledgePrevious = '';
        this.Description = '';


    }

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
    this.buildForm();

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
    if (this.form.valid) {
      const question: Question = this.form.value;


    }
  }


}


//    background-color: rgba(130,177,255,0.6);

//    background-color: rgb(198,216,29,0.6);

//    background-color: rgba(221, 10, 28, 0.73);
