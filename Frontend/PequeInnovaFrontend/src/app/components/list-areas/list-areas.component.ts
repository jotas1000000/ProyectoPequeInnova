import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { M}

@Component({
  selector: 'app-list-areas',
  templateUrl: './list-areas.component.html',
  styleUrls: ['./list-areas.component.scss']
})
export class ListAreasComponent implements OnInit {

  constructor(private http: HttpClient) { }

  

  

 /*  areas = [
    {
      title: 'Matematica',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      img: 'assets/images/areas/math.jpg'
    },
    {
      title: 'Biologia',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      img: 'assets/images/areas/biology.jpg'
    },
    {
      title: 'Quimica',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      img: 'assets/images/areas/chemistry.jpg'
    },
    {
      title: 'Area Title 4',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      img: 'assets/images/areas/math.jpg'
    },
    {
      title: 'Area Title 5',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      img: 'assets/images/areas/chemistry.jpg'
    },
    {
      title: 'Area Title 6',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      img: 'assets/images/areas/biology.jpg'
    },
    {
      title: 'Area Title 7',
      description: 'Descripcion Bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ble bli blo blu.',
      img: 'assets/images/areas/chemistry.jpg'
    }
  ];

  slides: any = []; */

  ngOnInit(): void {

    this.http.get("").subscribe((resp:any) =>);

    /* this.slides = this.areas; */
  }
}
