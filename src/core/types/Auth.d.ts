export type RoleType =
    | 'Student'
    | 'GroupLeader'
    | 'Marking'
    | 'Teacher'
    | 'Admin';

export type AuthType = {
    id: number;
    name: string;
    surName: string;
    patronymic: string;
    email: string;
    role: RoleType;
    student?: {
        groupId: number;
    };
};
