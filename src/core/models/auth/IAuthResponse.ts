import { IAuthUser } from './IAuthUser';

export interface IAuthResponse {
    accessToken: string;
    user: IAuthUser;
}
