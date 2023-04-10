export type RoleType = 'student' | 'groupLeader' | 'marking' | 'teacher' | 'admin';

export type AuthType = {
    id: string;
    name: string;
    surName: string;
    patronymic?: string;
    email: string;
    role: RoleType;
};
