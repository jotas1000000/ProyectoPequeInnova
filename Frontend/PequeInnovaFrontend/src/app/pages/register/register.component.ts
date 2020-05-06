import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from './../../utils/validators';
import { RegisterStudent } from '../../core/models/RegisterStudent.model';
import {StudentService} from './../../core/services/student/student.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  date = new FormControl(new Date('2017, 0, 1'));
  serializedDate = new FormControl((new Date()).toISOString());  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private router: Router
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
      this.studentService.registerStudent(student)
      .subscribe((result) => {
        console.log(result);
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



      /* id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]], */
    });
  }

  get priceField() {
    return this.form.get('price');
  }

  pruebas(){
    const student: RegisterStudent = this.form.value;
    student.Age = 10;
    student.Uid='123';

    console.log(student);
  }

}
