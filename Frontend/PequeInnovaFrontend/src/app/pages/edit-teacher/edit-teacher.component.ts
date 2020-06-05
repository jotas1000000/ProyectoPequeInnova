import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RegisterTeacher } from 'src/app/core/models/RegisterTeacher.model';
import { formatDate } from '@angular/common';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { Teacher } from 'src/app/core/models/Teacher.model';
import { EditTeacher } from 'src/app/core/models/EditTeacher.model';



@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {
  id: string;
  public teacher: any = [];
  messageBinding: string=null;
  stateRequest:boolean=false;
  date = new FormControl(new Date(2017, 0, 1));
  serializedDate = new FormControl((new Date()).toISOString());
  form: FormGroup;
  length:any;
  showForm: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    public dialog: MatDialog,
    private _Activatedroute:ActivatedRoute
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.updateProfile()
  }

  private async buildForm() {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.teacherService.getTeacher(this.id).subscribe(data => {this.teacher = data; let x = this.length})
    console.log(this.id);
    console.log(this.teacher);

    this.form = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      city: ['', [Validators.required]]

    });
  }
  updateProfile() {
    console.log(this.teacher)
    this.form.patchValue(this.teacher);
  }

  

  saveTeacher(event: Event){
    event.preventDefault();
    if (this.form.valid) {
      const newTeacher: Teacher = this.form.value;
      newTeacher.uid='123';
      this.teacherService.editTeacher(newTeacher)
      .subscribe((result) => {
        console.log(result);
        this.stateRequest = result.item1 ;
        if(result.item1 == true){
          setTimeout(() => {
            this.messageBinding = 'Profesor editado correctamente';
          }, 2000);
        }else
        {
          setTimeout(() => {
            this.messageBinding = result.message;
          }, 2000);
        }

      });
    }
  }

  FunctionEscape(){
    this.router.navigate(['./teacherControl']);
  }

  ResetBinding(){
    if(this.stateRequest)
    {
        this.router.navigate(['./teacherControl']);
    }else{

      this.messageBinding=null;
    }
  }
}
