import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/core/models/User.model';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  constructor(private studentService: StudentService,
    private authenticationService: AuthenticationService) { }

 //User vars
  user: User = null;
  userId: string = null;
  userName: string = null;
  userNickName: string = null;
  userLastname: string = null;

  //
  public inscriptions: any = [];

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue;
    this.setUserVariables();

    this.inscriptions = null;
    this.getInscriptions();

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

  private getInscriptions(){
    this.studentService.getInscriptions(this.userId).subscribe(data =>{ 
      this.inscriptions = data;
      console.log(data);
    });
  }

}
