import { Area } from './../../models/Area';
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

  constructor(
    private areasService: AreaService,
    private coursesServices: CourseService,
    private activatedRoute: ActivatedRoute){ }

  public courses = [];
  public areas = [];

  // Route vars
  areaId: number;
  // Area vars
  areaName: string;

  ngOnInit(): void {
    this.setRouteVariables();
    this.setCoursesData();
    this.setAreaData();
  }

  private setRouteVariables(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaId = params['areaId'];
    });
  }

  private setCoursesData(): void {
    this.coursesServices.getCourseList(this.areaId)
      .subscribe(data => this.courses = data);
  }

  private setAreaData(): void {
    this.areasService.getAreaList()
      .subscribe(data => {
          this.areas = data;
          for (const area of data) {
            if (area.id == this.areaId) {
              this.areaName = area.name;
              break;
            }
          }
        });
  }
}
