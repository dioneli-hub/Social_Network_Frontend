import {SimpleUserModel} from "./user.model";
import {LikeModel} from "./like.model";

export interface PostModel {
  id: number;
  text: string;
  createdAt: Date;
  totalLikes: number;
  totalComments: number;
  author: SimpleUserModel;
  showComments: boolean;
  comments: Array<PostCommentModel>;
  comment: string;
  likes: Array<LikeModel>;
}

export interface PostCommentModel {
  id: number;
  text: string;
  createdAt: Date;
  author: SimpleUserModel;
}
