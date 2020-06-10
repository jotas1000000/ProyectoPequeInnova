import { Component, OnInit,HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {School} from './../../../core/models/School.model';
import {MdbTableDirective} from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {SchoolService} from './../../../core/services/school/school.service';
import {FormControl} from '@angular/forms';
import { EditSchool } from 'src/app/core/models/EditSchool.model';
//import { get } from 'http';


@Component({
  selector: 'app-school-control-page',
  templateUrl: './school-control-page.component.html',
  styleUrls: ['./school-control-page.component.scss']
})
export class SchoolControlPageComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  schools: any = [];
  elements: any = [];
  headElements = ['ID', 'Colegio', 'Ciudad', 'Funciones']; 
  searchText: string = '';
  previous: string;
  row: number;
  id: string;
  ide: string;
  name: string;
  city: string;
  school: EditSchool = new EditSchool();

  constructor( private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private schoolService: SchoolService ) { 
    
  }

  ngOnInit(): void {
    this.getSchoolss();
  }
  getSchoolss(){
    this.schoolService.getSchools().subscribe(data => this.schools = data);
  }
  setDataDeleteSchool(id: string, row: number){
    this.row= row;
    this.id= id;
  }
  setDataEditSchool(ide: string, name: string, city: string){
    this.city= city;
    this.name= name;
    this.ide= ide;
  }
  editSchool(){
    console.log(this.name);
    console.log(this.city); 
    this.school.name=this.name;
    this.school.city=this.city;

    console.log(this.school);
    this.schoolService.editSchools(this.ide, this.school).subscribe();
    setTimeout(() => { }, 2000);
    this.getSchoolss();
  }
  deleteSchool(){
    this.schoolService.deleteSchools(this.ide).subscribe(data => this.schools = data);
    this.schools.splice(this.row, 1);
  }

}


