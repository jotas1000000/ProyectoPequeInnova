import { Component, OnInit, HostListener, ViewChild, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import {MdbTableDirective, ModalContainerComponent, ModalDirective} from 'angular-bootstrap-md';
import {Router} from '@angular/router';
import {TeacherService} from '../../../core/services/teacher/teacher.service';
import { EditTeacherComponent } from '../../edit-teacher/edit-teacher.component';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { Teacher } from 'src/app/core/models/Teacher.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { spaceValidator } from 'src/app/validators/spaceValidator.validator';
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
  public current_teacher: any;
  public assignments: any =[];
  form: FormGroup;
  Assignment = new FormControl('');

  hideRequiredControlAssignment = new FormControl(false);
  floatLabelControlAssignment = new FormControl('auto');


  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private assignmentService: AssignmentService,
    private router: Router,
    ) { 
      this.buildForm();
    }
  @HostListener('input') oninput() { this.searchItems();
  }
  ngOnInit(): void {
    this.teacherService.getAllTeachersWithAssingments().subscribe(data => this.teachers = data);
    this.mdbTable.setDataSource(this.teachers);
    this.previous = this.mdbTable.getDataSource(); 
    this.assignmentService.getAllAssignments().subscribe(data => this.assignments = data);

  }
  private buildForm() {
    this.form = this.formBuilder.group({
      Assignment: this.Assignment,
    },{
    });
  }

  deleteTeacher(id:string, rowNumber:number){
    var resp;
    this.teacherService.deleteTeacher(id).subscribe(data => resp = data);
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

  updateAssignmentModal(element: any){
    this.current_teacher = element;
  }

  changeAssignment(){
    
  }

}