import { Game } from "./game.interface";
import { Interest } from "./interest.interface";
import { ProfileGame } from "./profileGame.interface";
import { ProfileInterest } from "./profileInterest.interface copy";
import { User } from "./user.interface";

export interface Profile{
	bio: string,
	gender: number,
	image: string,
	username: string,
	interest_list: ProfileInterest[]
	game_list: ProfileGame[]
}