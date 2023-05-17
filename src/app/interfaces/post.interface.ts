import { User } from "./user.interface";
import { Trend } from './trend.interface';
import { Like } from "./like.interface";
import { Comment } from "./comment.interface";

export interface Post{
    id: number,
    title: string,
    description: string,
    date: string,
    imgurl: string,
    trendsList: Trend[],
    user: User,
    likes: Like[]
    comments: Comment[]
}