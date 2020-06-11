import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/Comment';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CommentService {


  constructor(private http: HttpClient) { }

  readonly APIUrl = `${environment.apiUrl}/User`;

  postComment(comment: Comment): Observable<Comment> {
    const href = `${this.APIUrl}/CreateComment`;
    return this.http.post<Comment>(href, comment);
  }

  deleteComment(userIdDelete: string, idCommentDelete: number): Observable<Comment> {
    const href = `${this.APIUrl}/${userIdDelete}/DeleteComment/${idCommentDelete}`;
    return this.http.put<Comment>(href, Comment);
  }
}
