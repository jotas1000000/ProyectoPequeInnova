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


  hide=true;
//form data
  form: FormGroup;
  Email = new FormControl('', [Validators.required, Validators.email, spaceValidator ]);
  Name = new FormControl('', [Validators.required, spaceValidator] );
  LastName = new FormControl('', [Validators.required, spaceValidator] );
  Birthday = new FormControl('', [Validators.required] ); //"1988-10-10T00:00:00",
  School = new FormControl('');
  Grade = new FormControl('', [Validators.required, spaceValidator] );


  hideRequiredControlSchool = new FormControl(false);
  floatLabelControlSchool = new FormControl('auto');

  hideRequiredControlGrade = new FormControl(false);
  floatLabelControlGrade = new FormControl('auto');

 
  schools: Array<School>;
 
  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  headElements = ['ID', 'Area', 'Curso', 'Funciones']; 
  searchText: string = '';
  previous: string;
  //user vars
  userId: string;

  //actual student vars
  actualStudent : Student = new Student();  
  //inscription data
  idDeleteInscription : number;
  rowNumber: number;
  public inscription: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    public dialog: MatDialog,
    private schoolService: SchoolService,
    private activatedRoute: ActivatedRoute
    ) {
      this.buildForm();
    } 

  ngOnInit(): void {
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
    },{
   
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



  saveStudent(event: Event) {
     event.preventDefault();
     if (this.form.valid) {
      const student: RegisterStudent = this.form.value;
      student.id= this.userId;
      student.Age = 10;
      student.Uid = '123';
      student.Birthday = formatDate(student.Birthday, 'yyyy-MM-ddTHH:mm:ss', 'en-US', 'undefined');//'+0430'
      console.log(student);
      this.studentService.editStudent(student)
      .subscribe();
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
