import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';

import { StudentService } from 'src/app/core/services/student/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/Student';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { spaceValidator } from 'src/app/validators/spaceValidator.validator';
import { patternValidator } from 'src/app/validators/patternValidator.validator';
import { School } from 'src/app/core/models/School.model';
import { SchoolService } from 'src/app/core/services/school/school.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterStudent } from 'src/app/core/models/RegisterStudent.model';
import { formatDate } from '@angular/common';
import { MustMatch } from 'src/app/validators/MustMatch.validator';
import { ForcePasswordChange } from 'src/app/core/models/ForcePasswordChange';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { User } from 'src/app/core/models/User.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';


@Component({
  selector: 'app-inscripctions',
  templateUrl: './inscripctions.component.html',
  styleUrls: ['./inscripctions.component.scss']
})
export class InscripctionsComponent implements OnInit {
  messageBinding: string = null;
  stateRequest = false;
  date = new FormControl(new Date(2017, 0, 1));
  serializedDate = new FormControl((new Date()).toISOString());

 /*  hidePassword = true;
  hideConfirmPassword = true;
  hide=true; */
//form data
  form: FormGroup;
  Email = new FormControl('', [Validators.required, Validators.email, spaceValidator ]);
  Name = new FormControl('', [Validators.required, spaceValidator] );
  LastName = new FormControl('', [Validators.required, spaceValidator] );
  Birthday = new FormControl('', [Validators.required] ); //"1988-10-10T00:00:00",
  School = new FormControl('');
  Grade = new FormControl('', [Validators.required, spaceValidator] );

  passwordForm: FormGroup;
  NewPassword = new FormControl('', Validators.compose([
    Validators.required,
    Validators.minLength(8),
    spaceValidator,
    patternValidator(/\d/),
    patternValidator(/[A-Z]/),
    patternValidator(/[a-z]/),
    patternValidator(/[!@#$%&_|.]/)
  ]));
  ConfirmPassword = new FormControl('', [Validators.required, Validators.minLength(8), spaceValidator]);

  hideRequiredControlSchool = new FormControl(false);
  floatLabelControlSchool = new FormControl('auto');

  hideRequiredControlGrade = new FormControl(false);
  floatLabelControlGrade = new FormControl('auto');

 
  schools: Array<School>;
 
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  headElements = ['ID', 'Area', 'Curso', 'Calificacion' ,'Funciones']; 
  searchText: string = '';
  previous: string;
  
  //user vars
  userId: string;

  //actual student vars
  actualStudent : Student = new Student();  

  //
  adminUser: User;


  //inscription data
  idDeleteInscription : number;
  rowNumber: number;
  public inscription: any = [];
  private updatePassword: ForcePasswordChange;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog,
    private schoolService: SchoolService,
    private activatedRoute: ActivatedRoute,
    private passwordService: PasswordService,
    private authenticationService: AuthenticationService
    ) {
      this.buildForm();
    } 

  ngOnInit(): void {
    this.adminUser = this.authenticationService.currentUserValue;
    this.inscription = null;
    this.setRouteVariables();
    this.getStudent();
    this.getInscriptions();
    this.schoolService.getSchools().subscribe( response => {
      this.schools = response;
    });

  }

  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }


  private getInscriptions(){
    this.studentService.getInscriptions(this.userId).subscribe(data =>{ 
      this.inscription = data;
      console.log(data);
    });
  }
  
  getStudent(){
    this.studentService.getStudents().subscribe(data =>{ 
      for (const mStudent of data) {
        if (mStudent.id == this.userId) {
          this.actualStudent = mStudent;
          this.Email.setValue(this.actualStudent.email) ;
          this.Name.setValue(this.actualStudent.name);
          this.LastName.setValue(this.actualStudent.lastName);
          this.Birthday.setValue(this.actualStudent.birthday);
          this.School.setValue(this.actualStudent.school);
          this.Grade.setValue(this.actualStudent.grade);
          break;
        }
      }
    });
  }

  setDataDeleteIncription(idInscription: number, rNumber: number){

    this.rowNumber= rNumber;
    this.idDeleteInscription = idInscription;
  }

  deleteInscription(){
    this.studentService.deleteInscription(this.idDeleteInscription).subscribe();
    this.inscription.splice(this.rowNumber, 1);
  }

  
  private buildForm() {
    this.form = this.formBuilder.group({
      Email: this.Email,
      Name: this.Name,
      LastName: this.LastName,
      Birthday: this.Birthday,
      School: this.School,
      Grade: this.Grade,
   /*    Password: this.Password,
      ConfirmPassword: this.ConfirmPassword */
    },{
     /*  validator: MustMatch('Password', 'ConfirmPassword') */
    });
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

  forceChangePassword(event:Event){
    this.updatePassword = this.passwordForm.value;
    this.updatePassword.Id = this.userId;
    console.log(this.updatePassword);
    console.log(this.updatePassword.Id);
    const bodyRequest = {
        Id: this.userId,
        OldPassword: '',
        NewPassword: this.passwordForm.value.NewPassword
    };
    console.log(bodyRequest);
    this.passwordService.forceChangePassword(this.adminUser.id, bodyRequest).subscribe((result) => {
    this.stateRequest = result.isSuccess;
    console.log(result);
    if (result){
      this.messageBinding = 'Contraseña cambiada correctamente';
      this.stateRequest = true;
      this.FunctionEscape();
    }else
    {
      this.messageBinding = 'Error al cambiar contraseña, revise los datos e intente de nuevo';
    }
    }, error => {
      alert('Ups algo salio mal, intente de nuevo. Si el problema persiste contactese con Soporte Tecnico!');
    }); 

  }
  
  getErrorMessagePassword() {
    if (this.NewPassword.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.NewPassword.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
    if(this.NewPassword.hasError('minlength')) {
      return 'La contraseña debe tener minimo 8 caracteres';
    }
    if(this.NewPassword.hasError('patternValidator')) {
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
      console.log(student);
      student.id= this.userId;
      student.Age = 10;
      student.Uid = '123';
      student.Birthday = formatDate(student.Birthday, 'yyyy-MM-ddTHH:mm:ss', 'en-US', 'undefined');//'+0430'
      console.log(student);
      this.studentService.editStudent(student, this.userId).subscribe();
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
   this.getStudent();
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
