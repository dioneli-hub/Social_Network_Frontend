import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostCommentModel, PostModel} from "../api-models/post.model";
import {LikeModel} from "../api-models/like.model";
import {environment} from "../environments/environment";
import {concatMap, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) {
  }

  createPost(text: string): Observable<PostModel> {
    return this.httpClient.post<PostModel>(`${environment.apiUrl}posts/`, {text})
  }

  removePost(postId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}posts/${postId}`)
  }

  news(): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(`${environment.apiUrl}posts/news`);
  }

  getPostLikes(postId: number): Observable<Array<LikeModel>> {
    return this.httpClient.get<Array<LikeModel>>(`${environment.apiUrl}posts/${postId}/likes`)
  }

  getPostComments(postId: number): Observable<Array<PostCommentModel>> {
    return this.httpClient.get<Array<PostCommentModel>>(`${environment.apiUrl}posts/${postId}/comments`);
  }

  addComment(postId: number, comment: string): Observable<PostCommentModel> {
    return this.httpClient.post<PostCommentModel>(`${environment.apiUrl}posts/${postId}/comments`, {text: comment})
  }

  removeComment(postId: number, commentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}posts/${postId}/comments/${commentId}`)
  }

  addLike(postId: number): Observable<LikeModel> {
    return this.httpClient.post<LikeModel>(`${environment.apiUrl}posts/${postId}/likes`, {})
  }

  removeLike(postId: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}posts/${postId}/likes`)
  }
}

