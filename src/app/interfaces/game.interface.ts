import { Profile } from "./profile.interface";

export interface Game{
    id: number,
    name: string,
    profile: Profile[]
}