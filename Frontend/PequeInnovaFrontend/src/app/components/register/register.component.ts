import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  levels =[6,7,8,9,10,11];
  schools = ["A","B", "C"]
  constructor() { }

  ngOnInit(): void {
  }

}
