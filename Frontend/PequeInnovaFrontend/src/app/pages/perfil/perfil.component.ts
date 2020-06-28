import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MustMatch } from 'src/app/validators/MustMatch.validator';
import { Area } from 'src/app/core/models/Area.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AreaService } from 'src/app/core/services/area/area.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password/password.service';
import { User } from 'src/app/core/models/User.model';
import { spaceValidator } from 'src/app/validators/spaceValidator.validator';
import { patternValidator } from 'src/app/validators/patternValidator.validator';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
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
    private authenticationService: AuthenticationService,
    private router: Router,
    private passwordService: PasswordService
  ) {
    this.buildForm();
  }


  slides: any = [[]];
  assignment: any;

  chunk(arr, chunkSize): any {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  //User vars
  user: User = null;
  userId: string = null;
  userName: string = null;
  userNickName: string = null;
  userLastname: string = null;

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
    this.setUserVariables();
    //console.log(this.user);
    this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
      this.areas = AreasResponse;
      //console.log(this.areas);
    });
    this.assignment = true;
  }

  ngAfterViewInit() {
  }

  private setUserVariables(): void {
    this.user = this.authenticationService.currentUserValue;
    if (this.user) {
      this.userId = this.user.id;
      this.userNickName = this.user.userName;
      this.userName = this.user.name;
      this.userLastname = this.user.lastName;
    }
  }

  private async buildForm() {
    this.form = this.formBuilder.group({

      OldPassword: ['', [Validators.required]],
      NewPassword: this.NewPassword,
      ConfirmPassword: this.ConfirmPassword

    }, {
      validator: MustMatch('NewPassword', 'ConfirmPassword')
    });
  }
  changePassword(event: Event) {

    const bodyRequest = {
      Id: '',
      OldPassword: this.form.value.OldPassword,
      NewPassword: this.form.value.NewPassword
    };
    this.passwordService.changeOwnPassword(this.user.id, bodyRequest).subscribe((result) => {
      this.stateRequest = result.isSuccess;
      console.log(result);
      if (result) {
        this.messageBinding = 'Contraseña cambiada correctamente';
        this.stateRequest = true;
        this.FunctionEscape();
      } else {
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
    if (this.NewPassword.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
    if (this.NewPassword.hasError('minlength')) {
      return 'La contraseña debe tener minimo 8 caracteres';
    }
    if (this.NewPassword.hasError('patternValidator')) {
      return 'La contrasena debe tener por lo menos un numero, una letra mayuscula, una letra minuscula, un caracter especial y no puede tener espacios';
    }

  }

  getErrorMessageConfirmPassword() {
    if (this.ConfirmPassword.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if (this.ConfirmPassword.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
    if (this.ConfirmPassword.hasError('minlength')) {
      return 'La contraseña debe tener minimo 8 caracteres';
    }
  }
  ResetBinding() {
    this.messageBinding = null;
  }

  FunctionEscape() {
    this.router.navigate([`./perfil`]);
  }
  
  NavigateToMyGrades() {
    this.router.navigate(['./grades']);
  }
}