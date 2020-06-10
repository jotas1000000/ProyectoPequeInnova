import { Component, OnInit, HostListener, ViewChild, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import {MdbTableDirective, ModalContainerComponent, ModalDirective} from 'angular-bootstrap-md';
import {Router} from '@angular/router';
import {TeacherService} from '../../../core/services/teacher/teacher.service';
import { EditTeacherComponent } from '../../edit-teacher/edit-teacher.component';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
@Component({
  selector: 'app-teacher-contol-page',
  templateUrl: './teacher-contol-page.component.html',
  styleUrls: ['./teacher-contol-page.component.scss']
})




export class TeacherContolPageComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  @ViewChild('closebutton') closebutton;
  @ViewChild('deleteTeacherModal', { static: true }) deleteTeacherModal:ModalDirective;
  headElements = ['ID', 'Nombre', 'Titulo', 'Asignaciones', 'Funciones']; 
  searchText: string = '';
  previous: string;
  public teachers: any = [];
  public assignments: any =[];
  constructor(
    private teacherService: TeacherService,
    private assignmentService: AssignmentService,
    private router: Router,
    ) { }
  @HostListener('input') oninput() { this.searchItems();
  }
  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe(data => this.teachers = data);
    this.mdbTable.setDataSource(this.teachers);
    this.previous = this.mdbTable.getDataSource(); 
    this.assignmentService.getAllAssignments().subscribe(data => this.assignments = data);

  }

  deleteTeacher(id:string, rowNumber:number){
    var resp;
    this.teacherService.deleteTeacher(id).subscribe();
    this.teachers.splice(rowNumber, 1);
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

  FunctionEscape(){
    this.router.navigate(['./teacherControl']);
  }

  getAssignments(el: any, assignmentlist: any[]){
    return assignmentlist[1].areaName
  }
}