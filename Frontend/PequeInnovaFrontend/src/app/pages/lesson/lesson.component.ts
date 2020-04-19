import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  constructor() { }
  comments = [
    {
      user: 'Pepito Perez',
      comments: 'Buen video Profe Rubius',
    },
    {
      user: 'Pedrito Jimenez',
      comments: 'Como se llama el alimento de los patos?',
    },
    {
      user: 'Juancito Mendez',
      comments: 'Creo que es Pancito',
    },
    {
      user: 'Pepito Perez',
      comments: 'Creo que era Maiz',
    },
    {
      user: 'Pedrito Jimenez',
      comments: 'Gracias Juancito!',
    },
    {
      user: 'Profe Rubius',
      comments: 'El alimento de los patitos eran limones 4k. Gracias chicoz.',
    }
  ];

  slides: any = [];
  ngOnInit(): void {
    this.slides = this.comments;
  }
}
