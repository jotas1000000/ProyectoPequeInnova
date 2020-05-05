import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-control-page',
  templateUrl: './course-control-page.component.html',
  styleUrls: ['./course-control-page.component.scss']
})
export class CourseControlPageComponent implements OnInit {

  courseCards: Array<any> = [
    {id: 1, title: 'Curso 1', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 2, title: 'Curso 2', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 3, title: 'Curso 3', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 4, title: 'Curso 4', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 5, title: 'Curso 5', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 6, title: 'Curso 6', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 7, title: 'Curso 7', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 8, title: 'Curso 8', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 9, title: 'Curso 9', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    {id: 10, title: 'Curso 10', Description: 'Some quick example text to build on the card title and make up the bulk of the card content'},
    
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
