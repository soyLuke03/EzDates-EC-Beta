import { Profile } from "./profile.interface";

export interface Interest{
    id: number,
    name: string,
    profile: Profile[]
}