import { Component, OnInit, NgModule } from '@angular/core';
import {Area} from './../../../core/models/Area.model';
import {AreaService} from './../../../core/services/area/area.service';
import {AuthenticationService} from './../../../core/services/authentication/authentication.service'; 
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {spaceValidator} from './../../../validators/spaceValidator.validator';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-area-control-page',
  templateUrl: './area-control-page.component.html',
  styleUrls: ['./area-control-page.component.scss']
})
export class AreaControlPageComponent implements OnInit {

  areas: Array<Area>;

  form: FormGroup;
  areaName = new FormControl('', [Validators.required, spaceValidator]);
  urlImage = new FormControl('', [Validators.required, spaceValidator]);
  descriptionArea = new FormControl('', [Validators.required, spaceValidator]);

  succesRequest = false;
  Operation = 'Creado';
  areaNameValidate = false;
  id: number;

  constructor(private areaService: AreaService,
              private authenticationService: AuthenticationService,
              fb: FormBuilder
    ) {
      this.form = new FormGroup({
        areaName: this.areaName,
        urlImage: this.urlImage,
        descriptionArea: this.descriptionArea
      });
    }

  ngOnInit(): void {
    this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
      this.areas = AreasResponse;
    });
  }

  Save() {
    const areaSave: Area = {
      id: 0,
      image: this.urlImage.value,
      name: this.areaName.value,
      description: this.descriptionArea.value,
      uid: this.authenticationService.currentUserValue.id,
      state: true,
      status: true,
      updateDate: '1988-10-10T00:00:00',
      createDate: '1988-10-10T00:00:00',
      courses: [],
      assignments: []
    };
    if ( this.Operation === 'Creado') {
      this.areaService.createArea(areaSave).pipe(first()).subscribe(Arearesponse => {
        if (Arearesponse.id > 0) {
          this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
            this.areas = AreasResponse;
            this.succesRequest = true;
          });
        }
      }, error => {
        alert('Ups algo salio mal, intente de nuevo. Si el problema persiste contactese con Soporte Tenico!');
      });
    } else if (this.Operation === 'Editado') {
      areaSave.id = this.id;
      this.areaService.editArea(areaSave).pipe(first()).subscribe(Arearesponse => {
        if (Arearesponse.id > 0) {
          this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
            this.areas = AreasResponse;
            this.succesRequest = true;
          });
        }
      }, error => {
        alert('Ups algo salio mal, intente de nuevo. Si el problema persiste contactese con Soporte Tenico!');
      });
    }


  }

  CleanForm() {
    this.form.reset({
      areaName: '',
      urlImage: '',
      descriptionArea: ''
    });
    this.Operation = 'Creado';
    this.succesRequest = false;
  }
  ResetForm() {
    this.form.reset({
      areaName: '',
      urlImage: '',
      descriptionArea: ''
    });
    this.Operation = 'Creado';
    this.succesRequest = false;
    this.id = 0;
  }
  getErrorMessage() {
    if (this.areaName.hasError('required')) {
      return 'Introduzca algun dato';
    }
    if(this.areaName.hasError('spaceValid')) {
      return 'No se puede comenzar con espacio';
    }
  }

  editArea(id, image, name, description) {
    this.Operation = 'Editado';
    this.id = id;
    this.form.reset({
      areaName: name,
      urlImage: image,
      descriptionArea: description
    });
  }

  deleteArea(areaId: number) {
    this.id = areaId;
  }

  confirmDeleteArea() {
    this.areaService.deleteArea(this.id).pipe(first()).subscribe(booleanResponse => {
      if (booleanResponse) {
        this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
          this.areas = AreasResponse;
          this.succesRequest = true;
          this.id = 0;
        });
      }
    }, error => {
      alert('Ups algo salio mal, intente de nuevo. Si el problema persiste contactese con Soporte Tenico!');
    });
  }

}
