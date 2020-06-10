import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-student-control',
  templateUrl: './student-control.component.html',
  styleUrls: ['./student-control.component.scss']
})
export class StudentControlComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  headElements = ['ID', 'Nombre', 'Colegio','Correo','Funciones']; 
  searchText: string = '';
  previous: string;

  //Students Data
  public students: any = [];
  rowNumber: number;
  idStudentDelete: string;

  constructor(private studentService: StudentService) { }


  ngOnInit(): void {
    this.setDataStudents();
    this.mdbTable.setDataSource(this.students);
    this.previous = this.mdbTable.getDataSource(); 

  }

  setDataStudents(){
    this.studentService.getStudents().subscribe(data =>{ 
      this.students = data;
    });
  }

  setDataDeleteStudent (idDelete:string, rNumber: number){
    this.rowNumber= rNumber;
    this.idStudentDelete= idDelete;
  }

  deleteStudent (){
    this.studentService.deleteStudent(this.idStudentDelete).subscribe();
    this.students.splice(this.rowNumber, 1);
  }

}
