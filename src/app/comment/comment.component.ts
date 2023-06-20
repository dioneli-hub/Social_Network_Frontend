import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostCommentModel } from 'src/api-models/post.model';
import { UserModel } from 'src/api-models/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input()
  currentUser: UserModel | null = null;

  @Input()
  comment: PostCommentModel | null = null;

  @Output()
  removeComment = new EventEmitter<PostCommentModel>();

  remove(comment: PostCommentModel) {
    this.removeComment.emit(comment);
  }
}
