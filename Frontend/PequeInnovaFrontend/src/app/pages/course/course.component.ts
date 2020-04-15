import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor() { }
  courses = [
    {
      title: 'Titulo de la Leccion 1',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      video: 'https://www.youtube.com/embed/upY5RrDLxgk',
      date: '27/02/2018'
    },
    {
      title: 'Titulo de la Leccion 2',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      video: 'https://www.youtube.com/embed/upY5RrDLxgk',
      date: '27/10/2018'
    },
    {
      title: 'Titulo de la Leccion 3',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      video: 'https://www.youtube.com/embed/upY5RrDLxgk',
      date: '27/11/2018'
    },
    {
      title: 'Titulo de la Leccion 4',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      video: 'https://www.youtube.com/embed/upY5RrDLxgk',
      date: '27/07/2018'
    },
    {
      title: 'Titulo de la Leccion 5',
      description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus et aut officiis debitis.',
      video: 'https://www.youtube.com/embed/upY5RrDLxgk',
      date: '27/02/2018'
    }
  ];

  slides: any = [];
  ngOnInit(): void {
    this.slides = this.courses;
  }
}
