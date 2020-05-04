import { Component, OnInit } from '@angular/core';
import { FilterStatusPipe } from './../../../Pipes/pipeFilter/filter-status.pipe';
@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {

  ColorEditable: any = 'white';

  StateEdit: boolean;
  StateAdd: boolean;
  StateSleep: boolean;

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

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
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
        
    }

    this.StateAdd = false;
    this.StateEdit = false;
    this.StateSleep = true;

  }
  constructor() { }


  ngOnInit(): void {
  }

}


//    background-color: rgba(130,177,255,0.6);

//    background-color: rgb(198,216,29,0.6);

//    background-color: rgba(221, 10, 28, 0.73);
