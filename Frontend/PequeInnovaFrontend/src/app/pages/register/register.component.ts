import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from './../../utils/validators';
import { RegisterStudent } from '../../core/models/RegisterStudent.model';
import {StudentService} from './../../core/services/student/student.service';
import {FormControl} from '@angular/forms';
import { formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {spaceValidator} from './../../validators/spaceValidator.validator';
import {MustMatch} from './../../validators/MustMatch.validator';
import {SchoolService} from './../../core/services/school/school.service';
import {School} from './../../core/models/School.model';
import {patternValidator} from './../../validators/patternValidator.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  messageBinding: string = null;
  stateRequest = false;
  date = new FormControl(new Date(2017, 0, 1));
  serializedDate = new FormControl((new Date()).toISOString());

  hidePassword = true;
  hideConfirmPassword = true;
  hide=true;

  form: FormGroup;
  userName = new FormControl('', [Validators.required, spaceValidator]);
  Email = new FormControl('', [Validators.required, Validators.email, spaceValidator ]);
  Name = new FormControl('', [Validators.required, spaceValidator] );
  LastName = new FormControl('', [Validators.required, spaceValidator] );
  Birthday = new FormControl('', [Validators.required] ); //"1988-10-10T00:00:00",
  School = new FormControl('');
  Grade = new FormControl('', [Validators.required, spaceValidator] );
  Password = new FormControl('', Validators.compose([
                                 Validators.required,
                                 Validators.minLength(8),
                                 spaceValidator,
                                 patternValidator(/\d/),
                                 patternValidator(/[A-Z]/),
                                 patternValidator(/[a-z]/),
                                 patternValidator(/[!@#$%&_|.]/)
  ]));
  ConfirmPassword = new FormControl('', [Validators.required, Validators.minLength(8) , spaceValidator] );

  hideRequiredControlSchool = new FormControl(false);
  floatLabelControlSchool = new FormControl('auto');

  hideRequiredControlGrade = new FormControl(false);
  floatLabelControlGrade = new FormControl('auto');

 
  schools: Array<School>;
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog,
    private schoolService: SchoolService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.schoolService.getSchools().subscribe( response => {
      this.schools = response;
    });
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      userName: this.userName,
      Email: this.Email,
      Name: this.Name,
      LastName: this.LastName,
      Birthday: this.Birthday,
      School: this.School,
      Grade: this.Grade,
      Password: this.Password,
      ConfirmPassword: this.ConfirmPassword
    },{
      validator: MustMatch('Password', 'ConfirmPassword')
    });
  }

  getErrorMessageUserName() {
    if (this.userName.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.userName.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
  }
  getErrorMessageEmail() {
    if(this.Email.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
    if (this.Email.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.Email.hasError('email')) {
      return 'Debe introducir una direccion email';
    }
  }

  getErrorMessageName() {
    if (this.Name.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.Name.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
  }
  getErrorMessageLastName() {
    if (this.LastName.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.LastName.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
  }

  getErrorMessageBirthday() {
    if (this.Birthday.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.Birthday.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
  }

  getErrorMessageSchool() {
    if (this.School.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.School.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
  }
  getErrorMessageGrade() {
    if (this.Grade.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.Grade.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
  }
  getErrorMessagePassword() {
    if (this.Password.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.Password.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
    if(this.Password.hasError('minlength')) {
      return 'La contraseña debe tener minimo 8 caracteres';
    }
    if(this.Password.hasError('patternValidator')) {
      return 'La contrasena debe tener por lo menos un numero, una letra mayuscula, una letra minuscula, un caracter especial y no puede tener espacios';
    }
    
  }

  getErrorMessageConfirmPassword() {
    if (this.ConfirmPassword.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.ConfirmPassword.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
    if(this.ConfirmPassword.hasError('minlength')) {
      return 'La contraseña debe tener minimo 8 caracteres';
    }
  }

  saveStudent(event: Event) {
     event.preventDefault();
     if (this.form.valid) {
      const student: RegisterStudent = this.form.value;
      student.Age = 10;
      student.Uid = '123';
      student.Birthday = formatDate(student.Birthday, 'yyyy-MM-ddTHH:mm:ss', 'en-US', 'undefined');//'+0430'
      console.log(student);
      this.studentService.registerStudent(student)
      .subscribe((result) => {
        this.stateRequest = result.isSuccess;
        if (result.isSuccess){
          setTimeout(() => {
            this.stateRequest = true;
            this.messageBinding = 'Inscripcion exitosa ya puedes ingresar';
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

 


  pruebas(){
    const student: RegisterStudent = this.form.value;
    student.Birthday = formatDate(student.Birthday, 'yyyy-MM-ddTHH:mm:ss', 'en-US', 'undefined');//
    student.Age = 10;
    student.Uid = '123';

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