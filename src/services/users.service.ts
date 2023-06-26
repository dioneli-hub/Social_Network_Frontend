import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApplicationFileModel, SimpleUserModel, UserModel} from "../api-models/user.model";
import {Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {PostModel} from "../api-models/post.model";
import {UserProvider} from "../providers/user.provider";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private httpClient: HttpClient,
              private userProvider: UserProvider) {
  }

  create(firstName: string, lastName: string, email: string, password: string) {

    return this.httpClient.post<SimpleUserModel>(`${environment.apiUrl}users/`, {
      firstName,
      lastName,
      email,
      password
    });
  }

  getUser(userId: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${environment.apiUrl}users/${userId}`);
  }

  current(): Observable<UserModel> {
    if (this.userProvider.currentUser !== null) {
      return of(this.userProvider.currentUser)
    }

    return this.httpClient
      .get<UserModel>(`${environment.apiUrl}auth`)
      .pipe(
        tap(user => this.userProvider.currentUser = user)
      )
  }

  getAll(): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>(`${environment.apiUrl}users`)
  }

  getFollowers(userId: number, limit: number): Observable<Array<SimpleUserModel>> {
    return this.httpClient.get<Array<SimpleUserModel>>(`${environment.apiUrl}users/${userId}/followers?limit=${limit}`);
  }

  getFollowsTo(userId: number, limit: number): Observable<Array<SimpleUserModel>> {
    return this.httpClient.get<Array<SimpleUserModel>>(`${environment.apiUrl}users/${userId}/follow-to?limit=${limit}`);
  }

  getPosts(userId: number): Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>(`${environment.apiUrl}users/${userId}/posts`);
  }

  hasFollow(userId: number, followToUserId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.apiUrl}users/${userId}/follow-to/${followToUserId}`);
  }

  follow(userId: number, followTo: number) {
    console.log('uId: ' + userId + ', FiD: ' +followTo)
    return this.httpClient.post(`${environment.apiUrl}users/${userId}/follow-to/${followTo}`,
     {},
     {responseType: 'text'}
    );
  }

  unfollow(userId: number, followTo: number) {
    console.log('uId: ' + userId + ', FiD: ' +followTo)
    return this.httpClient.delete(`${environment.apiUrl}users/${userId}/follow-to/${followTo}`,
    {responseType: 'text'});
  }

  uploadAvatar(file: File): Observable<ApplicationFileModel> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<ApplicationFileModel>(`${environment.apiUrl}users/avatar`, formData);
  }
}
