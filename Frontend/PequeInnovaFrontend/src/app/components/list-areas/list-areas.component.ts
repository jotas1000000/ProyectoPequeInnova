import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-areas',
  templateUrl: './list-areas.component.html',
  styleUrls: ['./list-areas.component.scss']
})
export class ListAreasComponent implements OnInit {

  constructor() { }
  areas = [
    {
      title: 'Area Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      img: 'assets/images/areas/math.jpg'
    },
    {
      title: 'Area Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      img: 'assets/images/areas/biology.jpg'
    },
    {
      title: 'Area Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      img: 'assets/images/areas/chemistry.jpg'
    },
    {
      title: 'Area Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      img: 'assets/images/areas/math.jpg'
    },
    {
      title: 'Area Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      img: 'assets/images/areas/chemistry.jpg'
    },
    {
      title: 'Area Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      img: 'assets/images/areas/biology.jpg'
    },
    {
      title: 'Area Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      img: 'assets/images/areas/chemistry.jpg'
    }
  ];

  slides: any = [];

  ngOnInit(): void {
    this.slides = this.areas;
  }
}
