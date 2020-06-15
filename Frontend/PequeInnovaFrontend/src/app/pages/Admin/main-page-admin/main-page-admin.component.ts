import { Component, OnInit, AfterViewInit} from '@angular/core';
import {Area} from './../../../core/models/Area.model';
import {AreaService} from './../../../core/services/area/area.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-main-page-admin',
  templateUrl: './main-page-admin.component.html',
  styleUrls: ['./main-page-admin.component.scss']
})
export class MainPageAdminComponent implements OnInit, AfterViewInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 30,
    navSpeed: 700,
    navText: ['ANTERIOR', 'SIGUIENTE'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      },
      1024: {
        items: 3
      }
    },
    nav: true
  };


  areas: Array<Area>;
  constructor(public breakpointObserver: BreakpointObserver,
              private areaService: AreaService) 
              { }

   
  slides: any = [[]];
  
  chunk(arr, chunkSize): any {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {

    this.areaService.getAreas('Id', 'false').subscribe(AreasResponse => {
      this.areas = AreasResponse;
      console.log(this.areas);
    });
  }

  ngAfterViewInit() {
  }

}
