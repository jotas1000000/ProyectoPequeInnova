import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar-logged-in',
  templateUrl: './navigation-bar-logged-in.component.html',
  styleUrls: ['./navigation-bar-logged-in.component.scss']
})
export class NavigationBarLoggedInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logOut(): void{
    // document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // localStorage.removeItem('token')
    // sessionStorage.removeItem('token')
    console.log("logged out")
  }

}
