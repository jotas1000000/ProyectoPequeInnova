import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Area } from './../../../core/models/Area.model';
import { AreaService } from './../../../core/services/area/area.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TeacherService } from './../../../core/services/teacher/teacher.service';
import { AssignmentR } from './../../../core/models/AssignmentR.model';
import { AuthenticationService } from './../../../core/services/authentication/authentication.service';
import { User } from './../../../core/models/User.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { patternValidator } from 'src/app/validators/patternValidator.validator';
import { spaceValidator } from 'src/app/validators/spaceValidator.validator';
import { MustMatch } from 'src/app/validators/MustMatch.validator';


@Component({
  selector: 'app-main-page-teacher',
  templateUrl: './main-page-teacher.component.html',
  styleUrls: ['./main-page-teacher.component.scss']
})
export class MainPageTeacherComponent implements OnInit, AfterViewInit {

  messageBinding: string = null;
  stateRequest: boolean = false;

  form: FormGroup;
  OldPassword = new FormControl('', [Validators.required]);
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



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 50,
    navSpeed: 700,
    navText: ['ANTERIOR', 'SIGUIENTE'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      },
      1024: {
        items: 3
      }
    },
    nav: true
  };


  areas: Array<Area>;
  constructor(public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private areaService: AreaService,
    private teacherService: TeacherService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private passwordService: PasswordService
  ) {
    this.buildForm();
  }


  slides: any = [[]];
  assignment: any;
  user: User;

  chunk(arr, chunkSize): any {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    //console.log(this.user);
    this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
      this.areas = AreasResponse;
      //console.log(this.areas);
    });

    this.teacherService.getAssignmentTeacher(this.user.id).subscribe(response => {
      this.assignment = response;
      console.log(this.assignment);
    });
  }

  ngAfterViewInit() {
  }


  NavigateToMyCourses() {
    if (this.user.role === 'Profesor' && this.assignment.areaName !== 'Sin Area') {
      this.router.navigate(['./mainTeacher/CourseOwner']);
    }
  }
  private async buildForm() {
    this.form = this.formBuilder.group({

      OldPassword: ['', [Validators.required]],
      NewPassword: this.NewPassword,
      ConfirmPassword: this.ConfirmPassword

    },{
      validator: MustMatch('NewPassword', 'ConfirmPassword')
    });
  }
  changePassword(event: Event) {
    this.passwordService.changeOwnPassword(this.user.id,this.form.value).subscribe((result) => {
      this.stateRequest = result.isSuccess;
      console.log(result);
      if (result){
        this.messageBinding = 'Contraseña cambiada correctamente';
        setTimeout(() => {
          this.stateRequest = true;
        }, 3000);
        this.FunctionEscape();
      }else
      {
        setTimeout(() => {
          this.messageBinding = 'Error al cambiar contraseña, revise los datos e intente de nuevo';
        }, 2000);
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
  ResetBinding() {
      this.messageBinding=null;
  }

  FunctionEscape() {
    this.router.navigate([`./mainTeacher`]);
  }
}

//routerLink="/mainTeacher/CourseOwner"