import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssignmentR } from 'src/app/core/models/AssignmentR.model';
import { Assignment } from 'src/app/core/models/Assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAllAssignments(): Observable<any[]>{
    return this.http.get<AssignmentR[]>(`${environment.apiUrl}/User/Assignment`)
  }
  
  postAssignment(assignment:Assignment){
    return this.http.post<any>(`${environment.apiUrl}/Auth/Assignment`, assignment);
  }
}
