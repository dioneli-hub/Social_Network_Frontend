import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { SmallUserIconComponent } from './small-user-icon/small-user-icon.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'post', component: PostComponent },
  { path: 'small-user-icon', component: SmallUserIconComponent },
  { path: 'header', component: HeaderComponent }
];
@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
