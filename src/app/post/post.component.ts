import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PostCommentModel, PostModel } from 'src/api-models/post.model';
import { UserModel } from 'src/api-models/user.model';
import { PostsService } from 'src/services/posts.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @Input()
  currentUser: UserModel | null = null;

  @Input()
  post: PostModel | null = null;

  @Output()
  removePost = new EventEmitter<PostModel>();

  constructor(private usersService: UsersService,
              private postsService: PostsService) {
  }

  remove(post: PostModel) {
    this.removePost.emit(post);
  }

  showComments(post: PostModel) {
    if (post.showComments) {
      post.showComments = false;
    } else {
      post.showComments = true;
      this.postsService
        .getPostComments(post.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(comments => post.comments = comments);
    }
  }

  addComment(post: PostModel) {
    if (post.comment) {
      this.postsService
        .addComment(post.id, post.comment)
        .pipe(takeUntil(this.destroy$))
        .subscribe(comment => {
          if (!post.comments) {
            post.comments = [];
          }
          post.totalComments += 1;
          post.comments.push(comment);
          post.comment = '';
          post.showComments = true;
        })
    }
  }

  onRemoveComment(post: PostModel, comment: PostCommentModel) {
    this.postsService
      .removeComment(post.id, comment.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        post.comments = post.comments.filter(x => x.id !== comment.id);
        post.totalComments -= 1;
      })
  }

  like(post: PostModel) {
    if (post.likes && post.likes.find(x => x.user.id === this.currentUser?.id)) {
      this.postsService
        .removeLike(post.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          post.totalLikes -= 1;
          post.likes = post.likes.filter(x => x.user.id !== this.currentUser?.id);
        })
    } else {
      this.postsService
        .addLike(post.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((like) => {
          post.totalLikes += 1;
          if (!post.likes) {
            post.likes = [];
          }
          post.likes.push(like);
        })
    }
  }

  isLiked(post: PostModel) {
    return post.likes &&
      post.likes.find(x => x.user.id === this.currentUser?.id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

