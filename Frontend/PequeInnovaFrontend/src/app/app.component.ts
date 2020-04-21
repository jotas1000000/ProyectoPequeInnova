import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {User} from './core/models/User.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PequeInnovaFrontend';
  user: User=null;
   /* = {
    name: 'string;',
    lastName: 'string',
    role: 'string',
    password: 'string',
    token: 'string'
    }; */
  constructor(private router: Router) { }
  ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

}
