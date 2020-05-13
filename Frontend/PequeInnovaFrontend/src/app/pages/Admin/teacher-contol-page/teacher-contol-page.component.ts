import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import {Router} from '@angular/router';
import {TeacherService} from '../../../core/services/teacher/teacher.service';
@Component({
  selector: 'app-teacher-contol-page',
  templateUrl: './teacher-contol-page.component.html',
  styleUrls: ['./teacher-contol-page.component.scss']
})
export class TeacherContolPageComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  headElements = ['ID', 'Nombre', 'Titulo', 'Funciones']; 
  searchText: string = '';
  previous: string;
  public teachers: any = [];
  constructor(private teacherService: TeacherService) { }
  @HostListener('input') oninput() { this.searchItems();
  }
  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe(data => this.teachers = data);
    this.mdbTable.setDataSource(this.teachers);
    this.previous = this.mdbTable.getDataSource(); 

  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {


      this.mdbTable.setDataSource(this.previous); 
      this.teachers = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.teachers = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['name', 'degree']);
      this.mdbTable.setDataSource(prev);
    }
  }

}


/* @Component({ 
selector:'search-table', 
templateUrl: './search-table.component.html', 
styleUrls:
['./search-table.component.scss'] }) */

//export class SearchTableComponent {
/* @ViewChild(MdbTableDirective, { static: true })
mdbTable: MdbTableDirective; 
elements: any = [];
headElements = ['ID', 'First', 'Last', 'Handle']; 
searchText: string = '';
previous: string;
constructor() { } */

/* @HostListener('input') oninput() { this.searchItems();
}  */

/* ngOnInit() {
for (let i = 1; i <= 10; i++) { 
  this.elements.push({ id:
  i.toString(), first: 'Wpis' + (Math.floor(Math.random() * i * 10))
  .toString(), last: 'Last' + (Math.floor(Math.random() * i * 10))
  .toString(), handle: 'Handle' + (Math.floor(Math.random() * i * 10))
  .toString() });
}
this.mdbTable.setDataSource(this.elements);
this.previous = this.mdbTable.getDataSource(); 
} */

/* searchItems() {
  const prev = this.mdbTable.getDataSource();

  if (!this.searchText) {
    this.mdbTable.setDataSource(this.previous); this.elements = this.mdbTable.getDataSource();
  }

  if (this.searchText) {
    this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['first', 'last']);
    this.mdbTable.setDataSource(prev);
  }

 } */


//}