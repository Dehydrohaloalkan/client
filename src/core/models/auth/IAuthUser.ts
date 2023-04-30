import { Role } from './Role';

export interface IAuthUser {
    id: string;
    name: string;
    surname: string;
    patronymic?: string;
    role: Role;
}
