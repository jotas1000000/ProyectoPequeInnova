import { Component, OnInit, HostListener, ViewChild, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import {MdbTableDirective, ModalContainerComponent, ModalDirective} from 'angular-bootstrap-md';
import {Router} from '@angular/router';
import {TeacherService} from '../../../core/services/teacher/teacher.service';
import { EditTeacherComponent } from '../../edit-teacher/edit-teacher.component';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { Teacher } from 'src/app/core/models/Teacher.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { spaceValidator } from 'src/app/validators/spaceValidator.validator';
import { AreaService} from 'src/app/services/area.service'
import { Assignment } from 'src/app/core/models/Assignment.model';
@Component({
  selector: 'app-teacher-contol-page',
  templateUrl: './teacher-contol-page.component.html',
  styleUrls: ['./teacher-contol-page.component.scss']
})




export class TeacherContolPageComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
 
  headElements = ['ID', 'Nombre', 'Titulo', 'Asignaciones', 'Funciones']; 
  searchText: string = '';
  previous: string;
  stateRequest = false;
  messageBinding: string = "Mensaje";

  public teachers: any = [];
  public areas: any = [];
  public assignments: any =[];

  public current_teacher: string = 'none';
  public current_assignmentId: number;

  newAssignment: Assignment;


  form: FormGroup;
  id = new FormControl('');
  areaId = new FormControl('');
  userId = new FormControl('');

  hideRequiredControlAssignment = new FormControl(false);
  floatLabelControlAssignment = new FormControl('auto');


  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private assignmentService: AssignmentService,
    private areaService: AreaService,
    private router: Router,
    ) { 
       this.buildForm();
    }
  @HostListener('input') oninput() { this.searchItems();
  }
  ngOnInit(): void {
    this.teacherService.getAllTeachersWithAssignments().subscribe(data => this.teachers = data);
    this.mdbTable.setDataSource(this.teachers);
    this.previous = this.mdbTable.getDataSource(); 
    this.areaService.getAreaList().subscribe(data=> this.areas =data);

  }
  public buildForm() {
    this.form = this.formBuilder.group({
      id: this.id,
      userId: this.userId,
      areaId: this.areaId
    },{
    });
  }

  updateAssignmentForm(newAreaId){
    this.form.patchValue({areaId : newAreaId});

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

  updateAssignmentModal(element: any, assignmentId: any){
    this.current_teacher = element;
    this.current_assignmentId = assignmentId;
  }

  debugAssignment(event: Event)
  {
    this.form.patchValue({
      userId : this.current_teacher,
      id: this.current_assignmentId
    });
    console.log(this.form.value)
  }

  changeAssignment(assignmentId: number, areaId: number, userId: string, event: Event){
    event.preventDefault();
    if (this.form.valid) {
      console.log(this.form.value)
      this.newAssignment = this.form.value;
      this.newAssignment.id = this.current_assignmentId;
      this.newAssignment.userId = this.current_teacher;

      this.assignmentService.postAssignment(this.newAssignment)
      .subscribe((result) => {
        this.stateRequest = result.isSuccess;
        if (result.isSuccess){
          setTimeout(() => {
            this.stateRequest = true;
            this.messageBinding = 'Cambio de area exitoso';
          }, 3000);
        }else
        {
          setTimeout(() => {
            this.messageBinding = result.message;
          }, 2000);
        }
      }, error => {
        alert('Ups algo salio mal, intente de nuevo. Si el problema persiste contactese con Soporte Tenico!');
      });
    }
  }
  
}
