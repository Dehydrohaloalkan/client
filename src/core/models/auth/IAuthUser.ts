import { Role } from './Role';

export interface IAuthUser {
    id: string;
    name: string;
    surName: string;
    patronymic?: string;
    email: string;
    role: Role;
}
