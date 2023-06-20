import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
1
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SmallUserIconComponent } from './small-user-icon/small-user-icon.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthInterceptor} from "../interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SecureImagePipe } from 'src/security/secureImage.pipe';

const AUTH_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

const routes: Routes = [
      { path: '', component: ProfileComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'profile/:id', component: ProfileComponent }
    ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    PostComponent,
    CommentComponent,
    UserInfoComponent,
    SmallUserIconComponent,
    LoginComponent,
    RegistrationComponent,
    SecureImagePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AUTH_INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
