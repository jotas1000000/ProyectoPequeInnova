import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor() { }
  courses = [
    {
      id: 1,
      title: 'Alimentacion de Patos',
      description: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      preview: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      img: 'assets/images/areas/math.jpg'
    },
    {
      id: 2,
      title: 'Titulo del Curso 2',
      description: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      preview: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      img: 'assets/images/areas/math.jpg'
    },
    {
      id: 3,
      title: 'Titulo del Curso 3',
      description: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      preview: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      img: 'assets/images/areas/math.jpg'
    },
    {
      id: 4,
      title: 'Titulo del Curso 4',
      description: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      preview: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      img: 'assets/images/areas/math.jpg'
    },
    {
      id: 5,
      title: 'Titulo del Curso 5',
      description: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      preview: 'Bla bla bla bla bla bla bla bla bla bla bla ',
      img: 'assets/images/areas/math.jpg'
    }
  ];

  slides: any = [];
  ngOnInit(): void {
    this.slides = this.courses;
  }

}
