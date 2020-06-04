import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/Comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

 
  constructor(private http: HttpClient){ }

  readonly APIUrl ="https://localhost:5001/api/User/CreateComment";

  postComment (comment:Comment) : Observable<Comment> {
    return this.http.post<Comment>(this.APIUrl, comment)
  }
}
