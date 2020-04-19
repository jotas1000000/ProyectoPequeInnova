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
      title: 'BIENVENIDO A PEQUEINNOVA!',
      description: 'Descripcion',
      img: 'assets/images/banner/banner_1.jpg'
    },
    {
      title: 'Enseñemos a nuestros PEQUES!',
      description: 'Descripcion',
      img: 'assets/images/banner/banner_2.jpg'
    },
    {
      title: 'Dime y lo olvido, enséñame y lo recuerdo, involucrarme y lo aprendo',
      description: 'Descripcion',
      img: 'assets/images/banner/banner_3.jpg'
    },
    {
      title: 'El acceso a información veraz es un elemento fundamental en el proceso de aplanar la curva.',
      description: 'Descripcion',
      img: 'assets/images/banner/banner_4.jpg'
    },
    {
      title: 'La información es un derecho, hagamos uso de ello y juntos cuidemos a los más chicos.',
      description: 'Descripcion',
      img: 'assets/images/banner/banner_5.jpg'
    }
  ];

  slides: any = [];

  ngOnInit(): void {
    this.slides = this.banners;
  }

}
