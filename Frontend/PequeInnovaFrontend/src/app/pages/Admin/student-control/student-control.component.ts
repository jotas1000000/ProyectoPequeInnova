import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';

@Component({
  selector: 'app-student-control',
  templateUrl: './student-control.component.html',
  styleUrls: ['./student-control.component.scss']
})
export class StudentControlComponent implements OnInit {

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
