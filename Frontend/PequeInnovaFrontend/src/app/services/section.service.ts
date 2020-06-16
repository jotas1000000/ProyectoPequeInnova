import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/Section';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  
  constructor(private http: HttpClient) { }
  readonly APIUrl =`${environment.apiUrl}`;

  getSectionList(areaId: number, courseId : number): Observable<Section[]>{
    const href = `${this.APIUrl}/area/${areaId}/courses/${courseId}/sections/`;
    return this.http.get<Section[]>(href);
  }
}
