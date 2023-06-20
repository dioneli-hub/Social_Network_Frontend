import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostModel } from 'src/api-models/post.model';
import { UserModel } from 'src/api-models/user.model';
import { AuthService } from 'src/services/auth.service';
import { PostsService } from 'src/services/posts.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private destroy$ = new Subject<void>();

  currentUser: UserModel | null = null;
  user: UserModel | null = null;
  posts: Array<PostModel> = [];
  postText = '';
  userId: number | null = null;
  hasCurrentFollow = false;
  users: Array<UserModel> = [];

  constructor(private usersService: UsersService,
              private postsService: PostsService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']).then();
    }

    this.usersService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users = users);

    this.usersService
      .current()
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        this.route
          .params
          .pipe(takeUntil(this.destroy$))
          .subscribe(params => {
            this.userId = params['id'];
            if (this.userId) {
              this.usersService
                .getUser(this.userId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(user => {
                  this.user = user;
                });
              this.usersService
                .getPosts(this.userId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(posts => {
                  this.posts = posts;
                  this.loadAllLikes();
                });
              if (this.currentUser) {
                this.usersService
                  .hasFollow(this.currentUser?.id, this.userId)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe(hasFollow => this.hasCurrentFollow = hasFollow)
              }
            } else {
              this.usersService.current()
                .subscribe(user => this.user = user);
              this.postsService
                .news()
                .pipe(takeUntil(this.destroy$))
                .subscribe(posts => {
                  this.posts = posts;
                  this.loadAllLikes();
                });
            }
          });
      });
  }

  loadAllLikes() {
    for (let post of this.posts) {
      this.postsService
        .getPostLikes(post.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(likes => post.likes = likes)
    }
  }

  createPost() {
    this.postsService
      .createPost(this.postText)
      .pipe(takeUntil(this.destroy$))
      .subscribe(post => {
        this.posts.unshift(post)
        this.postText = '';
      })
  }

  onRemovePost(post: PostModel) {
    this.postsService
      .removePost(post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.posts = this.posts.filter(x => x.id !== post.id);
      });
  }

  onFollowChange() {
    if (this.user && this.currentUser) {
      if (this.hasCurrentFollow) {
        this.usersService
          .unfollow(this.currentUser.id, this.user.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.hasCurrentFollow = false;
          });
      } else {
        this.usersService
          .follow(this.currentUser.id, this.user.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.hasCurrentFollow = true;
          });
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
