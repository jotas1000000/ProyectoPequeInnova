import { Component, OnInit, NgModule } from '@angular/core';
import {Area} from './../../../core/models/Area.model';
import {AreaService} from './../../../core/services/area/area.service';
@Component({
  selector: 'app-area-teacher-page',
  templateUrl: './area-teacher-page.component.html',
  styleUrls: ['./area-teacher-page.component.scss']
})
export class AreaTeacherPageComponent implements OnInit {

  areas: Array<Area>;
  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
    this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
      this.areas = AreasResponse;
      console.log(this.areas);
    });
  }

}
