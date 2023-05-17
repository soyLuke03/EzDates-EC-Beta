import { User } from "./user.interface";
import { Post } from "./post.interface";

export interface Like{
    post: Post
    user: User
}