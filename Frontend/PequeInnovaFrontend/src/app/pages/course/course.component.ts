import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  areaId: number;
  courseId: number;

  constructor(private activatedRoute: ActivatedRoute) { }
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
    //getting routes
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
      this.courseId = params['courseId'];
    });

    this.slides = this.lessons;
  }
}
