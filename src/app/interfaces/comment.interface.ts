import { User } from "./user.interface";
import { Post } from "./post.interface";

export interface Comment{
    post: Post
    user: User
    message: string
}