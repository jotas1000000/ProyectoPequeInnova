import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterTeacher } from 'src/app/core/models/RegisterTeacher.model';
import { formatDate } from '@angular/common';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';
import { MatDialog } from '@angular/material/dialog';
import { Teacher } from 'src/app/core/models/Teacher.model';



@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {
  messageBinding: string=null;
  stateRequest:boolean=false;
  date = new FormControl(new Date(2017, 0, 1));
  serializedDate = new FormControl((new Date()).toISOString());
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private router: Router,
    public dialog: MatDialog
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      Name: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Degree: ['', [Validators.required]],
      City: ['', [Validators.required]]

    });
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
