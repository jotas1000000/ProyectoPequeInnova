import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-cards-areas',
  templateUrl: './cards-areas.component.html',
  styleUrls: ['./cards-areas.component.scss']
})
export class CardsAreasComponent implements OnInit {

  constructor(private areasService: AreaService) { }

  public areas = [];

  ngOnInit(): void {
    this.areasService.getAreaList()
      .subscribe(data => this.areas = data);
  }

}
