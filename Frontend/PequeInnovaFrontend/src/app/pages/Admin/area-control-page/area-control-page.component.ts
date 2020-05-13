import { Component, OnInit, NgModule } from '@angular/core';
import {Area} from './../../../core/models/Area.model';
import {AreaService} from './../../../core/services/area/area.service';
@Component({
  selector: 'app-area-control-page',
  templateUrl: './area-control-page.component.html',
  styleUrls: ['./area-control-page.component.scss']
})
export class AreaControlPageComponent implements OnInit {

  areas: Array<Area>;
  constructor(private areaService: AreaService) { }

  ngOnInit(): void {
    this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
      this.areas = AreasResponse;
      console.log(this.areas);
    });
  }

}
