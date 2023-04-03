export type RoleType =
    | 'Student'
    | 'GroupLeader'
    | 'Marking'
    | 'Teacher'
    | 'Admin';

export type AuthType = {
    role: RoleType;
    name: string;
    surName: string;
};
