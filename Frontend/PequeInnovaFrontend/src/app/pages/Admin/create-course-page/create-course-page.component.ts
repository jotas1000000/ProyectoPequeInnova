import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {

  editField: string;
  personList: Array<any> = [
    { id: 1, name: 'Aurelia Vega' },
    { id: 2, name: 'Guerra Cortez' },
    { id: 3, name: 'Guadalupe House' },
    { id: 4, name: 'Aurelia Vega'},
    { id: 5, name: 'Elisa Gallagher' },
  ];

  awaitingPersonList: Array<any> = [
    { id: 6, name: 'George Vega'},
    { id: 7, name: 'Mike Low' },
    { id: 8, name: 'John Derp' },
    { id: 9, name: 'Anastasia John' },
    { id: 10, name: 'John Maklowicz'},
  ];

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.awaitingPersonList.push(this.personList[id]);
    this.personList.splice(id, 1);
  }

  add() {
    if (this.awaitingPersonList.length > 0) {
      const person = this.awaitingPersonList[0];
      this.personList.push(person);
      this.awaitingPersonList.splice(0, 1);
    }
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
