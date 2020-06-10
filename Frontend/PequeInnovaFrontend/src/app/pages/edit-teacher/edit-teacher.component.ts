import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RegisterTeacher } from 'src/app/core/models/RegisterTeacher.model';
import { formatDate } from '@angular/common';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { Teacher } from 'src/app/core/models/Teacher.model';
import { EditTeacher } from 'src/app/core/models/EditTeacher.model';
import { AreaService} from 'src/app/services/area.service'
import { Assignment } from 'src/app/core/models/Assignment.model';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';



@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {

  messageBinding: string=null;
  stateRequest:boolean=false;

  hideRequiredControlAssignment = new FormControl(false);
  floatLabelControlAssignment = new FormControl('auto');

  id: string;
  public teacher: any = [];
  public teachers: any = [];
  public areas: any = [];
  form: FormGroup;
  date = new FormControl(new Date(2017, 0, 1));
  serializedDate = new FormControl((new Date()).toISOString());
  
  length:any;
  showForm: boolean = true;

  areaForm: FormGroup;
  assignmentId = new FormControl('');
  areaId = new FormControl('');
  userId = new FormControl('');
  
  public current_teacher: string = 'none';
  public current_assignmentId: number;
  newAssignment: Assignment;

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private assignmentService: AssignmentService,
    private areaService: AreaService,
    private router: Router,
    public dialog: MatDialog,
    private _Activatedroute:ActivatedRoute,
    private changeDetectorRefs:ChangeDetectorRef
  ) { 
    this.buildForm();
    this.buildAreaForm();
  }

  ngOnInit(): void {
    this.updateProfile()
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.teacherService.getAllTeachersWithAssignments().subscribe(data => this.teachers = data);
    
  }

  private async buildForm() {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.teacherService.getTeacher(this.id).subscribe(data => 
      {
        if(data)
        this.teacher = data; let x = this.length
      })
    this.teacherService.getTeacher(this.id).subscribe(teacherResponse =>{})
    
    this.areaService.getAreaList().subscribe(data=> this.areas =data);
    this.form = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      city: ['', [Validators.required]]

    });
  }

  public buildAreaForm() {
    this.areaForm = this.formBuilder.group({
      id: this.assignmentId,
      userId: this.userId,
      areaId: this.areaId
    },{
    });
  }

  refresh() {
    this.teacherService.getAllTeachersWithAssignments().subscribe(
    (data) => {
      this.teachers = data;
      this.changeDetectorRefs.detectChanges();
    });
  }

  updateProfile() {
    this.form.patchValue(this.teacher);
  }

  updateAssignmentForm(newAreaId){
    this.areaForm.patchValue({areaId : newAreaId});
  }
  updateAssignmentModal(element: any, assignmentId: any){
    this.current_teacher = element;
    this.current_assignmentId = assignmentId;
  }
    debugAssignment(event: Event)
  {
    for (let index = 0; index < this.teachers.length; index++) {
      const element = this.teachers[index];
      if (element.id == this.id)
      {
        this.assignmentId = element.assignmentId;
      }
    }
    this.areaForm.patchValue({
      userId : this.teacher.id,
      
      id: this.assignmentId
    });
  }
  changeAssignment(event: Event){
    event.preventDefault();
    if (this.areaForm.valid){
      for (let index = 0; index < this.teachers.length; index++) {
        const element = this.teachers[index];
        if (element.id == this.id)
        {
          this.current_assignmentId = element.assignmentId;
        }
      }
      if(this.current_assignmentId == 0)
      {
        // Post Nueva asignacion
        this.areaForm.patchValue({
          userId : this.teacher.id
        });
        
        this.newAssignment = this.areaForm.value;
        this.newAssignment.id = this.current_assignmentId;
        this.newAssignment.userId = this.id;
        this.assignmentService.postAssignment(this.newAssignment)
        .subscribe((result) => {
          this.stateRequest = result.item1;
          if (result.item1){
            setTimeout(() => {
              this.stateRequest = true;
              this.messageBinding = "Cambio de area exitoso";
              this.teacherService.getAllTeachersWithAssignments().subscribe(data => this.teachers = data);

            }, 1000);
          }else
          {
            setTimeout(() => {
              this.messageBinding = result.message;
            }, 2000);
          }
          this.refresh();
        }, error => {
          alert('Ups algo salio mal, intente de nuevo. Si el problema persiste contactese con Soporte Tenico!');
        });
      }
      else
      {
        // Put sobre asignacion
        this.areaForm.patchValue({
          userId : this.teacher.id,
          
          id: this.assignmentId
        });
        this.newAssignment = this.areaForm.value;
        this.newAssignment.id = this.current_assignmentId;
        this.newAssignment.userId = this.id;
        this.assignmentService.putAssignment(this.newAssignment)
        .subscribe((result) => {
          this.stateRequest = result ;
          if(result == true){
            setTimeout(() => {
              this.messageBinding = 'Cambio de area exitoso';
            }, 2000);
          }else
          {
            setTimeout(() => {
              this.messageBinding = result.message;
            }, 2000);
          }
          this.refresh();
        }, error => {
          alert('Ups algo salio mal, intente de nuevo. Si el problema persiste contactese con Soporte Tecnico!');
        });
      }
    }
  }

  saveTeacher(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      const newTeacher: Teacher = this.form.value;
      newTeacher.uid = '123';
      this.teacherService.editTeacher(newTeacher)
      .subscribe((result) => {
        this.stateRequest = result.item1 ;
        if (result.item1 === true){
          this.teacher.city = this.form.value.city;
          this.messageBinding = 'Profesor editado correctamente';
        }else
        {
          this.messageBinding = result.message;
        }

      });
    }
  }

  FunctionEscape(){
    this.router.navigate([`./editTeacher/${this.id}`]);
  }

  ResetBinding(){
    if(this.stateRequest)
    {
        this.router.navigate([`./editTeacher/${this.id}`]);
    }else{

      this.messageBinding=null;
    }
  }
}
