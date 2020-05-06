import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from './../../utils/validators';
import { RegisterStudent } from '../../core/models/RegisterStudent.model';
import {StudentService} from './../../core/services/student/student.service';
import {FormControl} from '@angular/forms';
import { formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
/*   providers: [ DatePipe ]
 */})
export class RegisterComponent implements OnInit {
  messageBinding: string=null;
  stateRequest:boolean=false;
  date = new FormControl(new Date(2017, 0, 1));
  serializedDate = new FormControl((new Date()).toISOString());  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const student: RegisterStudent = this.form.value;
      student.Age = 10;
      student.Uid='123';
      student.Birthday = formatDate(student.Birthday, 'yyyy-MM-ddTHH:mm:ss', 'en-US', 'undefined');//'+0430'
      this.studentService.registerStudent(student)
      .subscribe((result) => {
        //console.log(result);
        this.stateRequest = result.isSuccess;
        if(result.isSuccess){
          setTimeout(() => {
            this.messageBinding = 'Inscripcion exitosa ya puedes ingresar';
          }, 2000);
         

        }else
        {
          setTimeout(() => {
            this.messageBinding = result.message;
          }, 2000);
           // this.messageBinding = result.message;
        }

        //this.router.navigate(['./admin/products']);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Name: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      //Age: ['', [Validators.required]],
      Birthday: ['', [Validators.required]], //"1988-10-10T00:00:00",
      School: ['', [Validators.required]],
      Grade: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
      //Uid: ['', [Validators.required]],

    });
  }


  pruebas(){
    const student: RegisterStudent = this.form.value;
    student.Birthday = formatDate(student.Birthday, 'yyyy-MM-ddTHH:mm:ss', 'en-US', 'undefined');//
    student.Age = 10;
    student.Uid='123';

    console.log(student);
  }
  FunctionEscape(){
    this.router.navigate(['./home']);
  }

    ResetBinding(){
      if(this.stateRequest)
      {
          this.router.navigate(['./home']);
      }else{

        this.messageBinding=null;
      }
    }
}


//formatDate(value: string | number | Date, format: string, locale: string, timezone?: string): string


/* @Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Hi {{data.name}}</h1>
  <div mat-dialog-content>
    <p>What's your favorite animal?</p>
    <mat-form-field>
      <mat-label>Favorite Animal</mat-label>
      <input matInput [(ngModel)]="data.animal">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
  </div>`,
})
export class DialogOverviewExampleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

} */