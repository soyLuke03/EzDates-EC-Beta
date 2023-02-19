import { User } from "./user.interface";

export interface Post{
    id: number,
    title: string,
    description: string,
    date: string,
    imgurl: string,
    user: User
}