import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss']
})
export class RegisterStudentComponent implements OnInit {

  levels =[6,7,8,9,10,11];
  schools = ["A","B", "C"]
  constructor() { }

  ngOnInit(): void {
  }

}
