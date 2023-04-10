import { IUser } from './IUser';

export interface IStudent {
    id: string;
    is_group_leader: boolean;
    is_marking: boolean;
    subgroup: boolean;
    user: IUser;
}
