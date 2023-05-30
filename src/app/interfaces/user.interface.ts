import { Profile } from "./profile.interface";

export interface User{
	username: string,
	email: string,
	password: string,
	name: string,
	surname: string,
	verificationCode: string,
	enabled: boolean,
	role: string,
}