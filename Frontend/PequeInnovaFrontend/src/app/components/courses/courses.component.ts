import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private areasService: AreaService, private coursesServices: CourseService, private activatedRoute: ActivatedRoute) { }

  public courses = [];
  public areas = [];

  //Route vars
  areaId: number;

  ngOnInit(): void {
    this.setRouteVariables();
    this.coursesServices.getCourseList(this.areaId)
      .subscribe(data => this.courses = data);
    this.areasService.getAreaList()
      .subscribe(data => this.areas = data);
  }



  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.areaId = params['areaId'];
    });
  }


 /*  courses = [
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
  } */

}
