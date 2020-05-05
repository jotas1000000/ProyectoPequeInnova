import { Component, OnInit } from '@angular/core';
import { AreaService } from './../../services/area.service';
@Component({
  selector: 'app-area-carousel',
  templateUrl: './area-carousel.component.html',
  styleUrls: ['./area-carousel.component.scss']
})
export class AreaCarouselComponent implements OnInit {

  constructor(private areasService: AreaService) { }

  public areas = [];

  ngOnInit(): void {
    this.areasService.getAreaList()
      .subscribe(data => this.areas = data);
  }


}
