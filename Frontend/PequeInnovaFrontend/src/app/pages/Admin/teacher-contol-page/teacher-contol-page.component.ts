import { Component, OnInit, HostListener, ViewChild, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import {MdbTableDirective, ModalContainerComponent, ModalDirective, StickyHeaderDirective} from 'angular-bootstrap-md';
import {Router} from '@angular/router';
import {TeacherService} from '../../../core/services/teacher/teacher.service';
import { EditTeacherComponent } from '../../edit-teacher/edit-teacher.component';
import { AssignmentService } from 'src/app/services/assignment/assignment.service';
import { Teacher } from 'src/app/core/models/Teacher.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { spaceValidator } from 'src/app/validators/spaceValidator.validator';
import { AreaService} from 'src/app/services/area.service'
import { Assignment } from 'src/app/core/models/Assignment.model';
import { patternValidator } from 'src/app/validators/patternValidator.validator';
import { MustMatch } from 'src/app/validators/MustMatch.validator';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { ForcePasswordChange } from 'src/app/core/models/ForcePasswordChange';
import { User } from 'src/app/core/models/User.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
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
  messageBinding: string = "";
  user: User;

  userId: string;
  public teachers: any = [];
  public areas: any = [];

  private current_teacher: string = 'none';
  private current_assignmentId: number;
  private updatePassword: ForcePasswordChange;

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

  hideRequiredControlAssignment = new FormControl(false);
  floatLabelControlAssignment = new FormControl('auto');


  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private authenticationService: AuthenticationService,
    private passwordService: PasswordService,
    private areaService: AreaService,
    private router: Router,
    ) { 
       this.buildPasswordForm();
    }
  @HostListener('input') oninput() { this.searchItems();
  }
  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.teacherService.getAllTeachersWithAssignments().subscribe(data => this.teachers = data);
    this.mdbTable.setDataSource(this.teachers);
    this.previous = this.mdbTable.getDataSource();
    this.areaService.getAreaList().subscribe(data => this.areas = data);
  }


  private async buildPasswordForm() {
    this.passwordForm = this.formBuilder.group({

      NewPassword: this.NewPassword,
      ConfirmPassword: this.ConfirmPassword

    },{
      validator: MustMatch('NewPassword', 'ConfirmPassword')
    });
  }
  updatePasswordModal(id:string){
    this.current_teacher = id;
  }


 
  deleteTeacher(id:string, rowNumber:number){
    this.teacherService.deleteTeacher(id).subscribe();
    this.teachers.splice(rowNumber, 1);
  }

  searchItems() {
   /*  const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous); 
      this.teachers = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.teachers = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['name', 'degree']);
      this.mdbTable.setDataSource(prev);
    } */
  }
  showData(value){
    this.userId = value.id;
  }

  FunctionEscape(){
    this.router.navigate(['./teacherControl']);
  }

  forceChangePassword(event:Event){
    this.updatePassword = this.passwordForm.value;
    this.updatePassword.Id = this.current_teacher;
    const bodyRequest = {
        Id: this.userId,
        OldPassword: '',
        NewPassword: this.passwordForm.value.NewPassword
    };
    this.passwordService.forceChangePassword(this.user.id, bodyRequest).subscribe((result) => {
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
 
}
