import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor() { }
  lessons = [
    {
      title: 'Titulo de la Leccion 1',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      video: 'https://www.youtube.com/embed/0dTfNF6iMDo',
      date: '27/02/2018'
    },
    {
      title: 'Titulo de la Leccion 2',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      video: 'https://www.youtube.com/embed/0dTfNF6iMDo',
      date: '27/10/2018'
    },
    {
      title: 'Titulo de la Leccion 3',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      video: 'https://www.youtube.com/embed/upY5RrDLxgk',
      date: '27/11/2018'
    },
    {
      title: 'Titulo de la Leccion 4',
     description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      video: 'https://www.youtube.com/embed/upY5RrDLxgk',
      date: '27/07/2018'
    }
  ];

  slides: any = [];
  ngOnInit(): void {
    this.slides = this.lessons;
  }
}
