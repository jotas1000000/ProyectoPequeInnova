import { Component, OnInit,HostListener, ViewChild } from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-school-control-page',
  templateUrl: './school-control-page.component.html',
  styleUrls: ['./school-control-page.component.scss']
})
export class SchoolControlPageComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  elements: any = [];
  headElements = ['ID', 'Colegio', 'Ciudad', 'Funciones']; 
  searchText: string = '';
  previous: string;

  constructor() { }

  @HostListener('input') oninput() { this.searchItems();
  }
  ngOnInit(): void {
    for (let i = 1; i <= 10; i++) {
      this.elements.push({ id:
      i.toString(), Colegio: 'Wpis' + (Math.floor(Math.random() * i * 10))
      .toString(), Ciudad: 'Last' + (Math.floor(Math.random() * i * 10))
      .toString(), Functions: 'Actions' + (Math.floor(Math.random() * i * 10))
      .toString() });
    }
    this.mdbTable.setDataSource(this.elements);
    this.previous = this.mdbTable.getDataSource(); 
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous); this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['Colegio', 'Ciudad']);
      this.mdbTable.setDataSource(prev);
    }
  }

}


