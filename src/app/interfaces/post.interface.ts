import { User } from "./user.interface";
import { Trend } from './trend.interface';

export interface Post{
    id: number,
    title: string,
    description: string,
    date: string,
    imgurl: string,
    trendsList: Trend[]
    user: User
}