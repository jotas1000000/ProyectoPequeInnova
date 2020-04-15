import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-carousel',
  templateUrl: './info-carousel.component.html',
  styleUrls: ['./info-carousel.component.scss']
})
export class InfoCarouselComponent implements OnInit {

  constructor() { }
  banners = [
    {
      title: 'aaaaaaaaaaaaaaaaaaaaa',
      description: 'Primer text',
      img: 'assets/images/banner/banner_1.jpg'
    },
    {
      title: 'eeeeeeeeeeeeeeeeeeeee',
      description: 'Segundo text',
      img: 'assets/images/banner/banner_2.jpg'
    },
    {
      title: 'iiiiiiiiiiiiiiiiiiiiii',
      description: 'Tercer text',
      img: 'assets/images/banner/banner_3.jpg'
    },
    {
      title: 'ooooooooooooooooooo',
      description: 'Cuarto text',
      img: 'assets/images/banner/banner_4.jpg'
    },
    {
      title: 'uuuuuuuuuuuuuuuuuuuuu',
      description: 'Quinto text',
      img: 'assets/images/banner/banner_5.jpg'
    }
  ];

  slides: any = [];

  ngOnInit(): void {
    this.slides = this.banners;
  }

}
