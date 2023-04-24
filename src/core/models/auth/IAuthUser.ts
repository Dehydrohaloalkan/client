import { Role } from './Role';

export interface IAuthUser {
    id: string;
    name: string;
    surName: string;
    patronymic?: string;
    role: Role;
}
