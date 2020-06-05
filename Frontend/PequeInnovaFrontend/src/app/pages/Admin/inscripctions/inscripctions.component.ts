import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import {MdbTableDirective} from 'angular-bootstrap-md';
import { TeacherService } from 'src/app/core/services/teacher/teacher.service';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-inscripctions',
  templateUrl: './inscripctions.component.html',
  styleUrls: ['./inscripctions.component.scss']
})
export class InscripctionsComponent implements OnInit {

  @ViewChild(MdbTableDirective, { static: true })
  mdbTable: MdbTableDirective; 
  headElements = ['ID', 'Area', 'Curso', 'Funciones']; 
  searchText: string = '';
  previous: string;
  //user vars
  userId: string;
  userName: string;
  userLastName: string;

  public students: any = [];
  constructor(private studentService: StudentService) { }
  @HostListener('input') oninput() { this.searchItems();
  }
  ngOnInit(): void {
    this.userId = "ff445a7a-d9a1-4f29-ae9d-cf297c9ffb30";
    this.studentService.getInscriptions(this.userId).subscribe(data =>{ 
      this.students = data;
      this.userName = data[0].name;
      this.userLastName = data[0].lastName;
      console.log(data);
    });
    this.mdbTable.setDataSource(this.students);
    this.previous = this.mdbTable.getDataSource(); 

  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {


      this.mdbTable.setDataSource(this.previous); 
      this.students = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.students = this.mdbTable.searchLocalDataByMultipleFields(this.searchText, ['name', 'degree']);
      this.mdbTable.setDataSource(prev);
    }
  }
  

}
