import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TokenModel} from "../api-models/token.model";
import {Observable, of} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {UserProvider} from "../providers/user.provider";
import {environment} from "../environments/environment";
import { ServiceResponse } from "src/api-models/service-response.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private userProvider: UserProvider) {  }

  private static setToken(tokenPair: TokenModel | null): void {
    if (tokenPair) {
      localStorage.setItem('token', tokenPair.token);
      localStorage.setItem('token-exp', tokenPair.expiredAt.toString());
    } else {
      this.removeLocalStorageItems();
    }
  }

  private static removeLocalStorageItems(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token-exp');
  }

  auth(email: string, password: string)  {
    return this.httpClient
      .post(`${environment.apiUrl}auth/`, { email, password })
      .pipe(
        tap((tokenResponse: any) => {
          AuthService.setToken(tokenResponse.data)}),
          //switchMap(token => of(this.isAuthenticated())),
      );
  }

  logout(): void {
    AuthService.setToken(null);
    this.userProvider.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  get token(): string|null {
    const expDate = new Date(localStorage.getItem('token-exp') as string);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  get expiredAt(): Date {
    const expDate = localStorage.getItem('token-exp');

    return expDate
      ? new Date(expDate)
      : new Date();
  }
}
