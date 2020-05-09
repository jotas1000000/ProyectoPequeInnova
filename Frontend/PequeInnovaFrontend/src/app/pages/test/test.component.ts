import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  areaId:number;

  constructor() { }
  questions = [
    {
      id:"1",
      question: 'Que Comen los patitos?',
      answer1: 'Los patos comen huevos',
      answer2: 'Los patos comen pan',
      answer3: 'Los patos comen a otros patos',
    },
    {
      id:"2",
      question: 'Por que las personas comen murcielagos?',
      answer1: 'Arruimar la vida a todos',
      answer2: 'Porque tenian nada mas que hacer',
      answer3: 'Todas las anteriores',
    },
    {
      id:"3",
      question: 'Pregunta 3',
      answer1: 'Respuesta 1 de la pregunta 3',
      answer2: 'Respuesta 2 de la pregunta 3',
      answer3: 'Respuesta 3 de la pregunta 3',
    },
    {
      id:"4",
      question: 'Pregunta 4',
      answer1: 'Respuesta 1 de la pregunta 4',
      answer2: 'Respuesta 2 de la pregunta 4',
      answer3: 'Respuesta 3 de la pregunta 4',
    },
    { 
      id:"5",
      question: 'Pregunta 5',
      answer1: 'Respuesta 1 de la pregunta 5',
      answer2: 'Respuesta 2 de la pregunta 5',
      answer3: 'Respuesta 3 de la pregunta 5',
    },
    {
      id:"6",
      question: 'Pregunta 6',
      answer1: 'Respuesta 1 de la pregunta 6',
      answer2: 'Respuesta 2 de la pregunta 6',
      answer3: 'Respuesta 3 de la pregunta 6',
    }
  ];


  slides: any = [];
  ngOnInit(): void {
    this.slides = this.questions;
  }
}