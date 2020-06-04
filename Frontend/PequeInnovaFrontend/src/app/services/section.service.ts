import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/Section';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  
  constructor(private http: HttpClient) { }
  readonly APIUrl ="https://localhost:5001/api";

  getSectionList(areaId: number, courseId : number): Observable<Section[]>{
    const href = `${this.APIUrl}/area/${areaId}/courses/${courseId}/sections/`;
    return this.http.get<Section[]>(href);
  }
}
