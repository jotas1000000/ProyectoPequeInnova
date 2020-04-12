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
      title: 'Titulo del Curso 1',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      img: 'assets/images/areas/math.jpg'
    },
    {
      id: 2,
      title: 'Titulo del Curso 2',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      img: 'assets/images/areas/math.jpg'
    },
    {
      id: 3,
      title: 'Titulo del Curso 3',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      img: 'assets/images/areas/math.jpg'
    },
    {
      id: 4,
      title: 'Titulo del Curso 4',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      img: 'assets/images/areas/math.jpg'
    },
    {
      id: 5,
      title: 'Titulo del Curso 5',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      img: 'assets/images/areas/math.jpg'
    }
  ];

  slides: any = [];
  ngOnInit(): void {
    this.slides = this.courses;
  }

}
