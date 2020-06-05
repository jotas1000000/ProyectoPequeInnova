import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-student-control',
  templateUrl: './student-control.component.html',
  styleUrls: ['./student-control.component.scss']
})
export class StudentControlComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  headElements = ['ID', 'Nombre', 'Colegio', 'Funciones']; 
  searchText: string = '';
  previous: string;
  public students: any = [];
  constructor(private studentService: StudentService) { }
  @HostListener('input') oninput() { this.searchItems();
  }
  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data =>{ 
      this.students = data;
      console.log(data);
    });
    this.mdbTable.setDataSource(this.students);
    this.previous = this.mdbTable.getDataSource(); 

  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {


      this.mdbTable.setDataSource(this.previous); 
      this.students = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.students = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['name', 'degree']);
      this.mdbTable.setDataSource(prev);
    }
  }
  
}
