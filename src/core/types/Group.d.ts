export type GroupInfoType = {
    id: number;
    number: string;
    form: number;
};

export type GroupType = GroupInfoType & {
    students: StudentType[];
};

export type GroupedGroupsType = { [key: number]: GroupInfoType[] };

export type StudentType = {
    id: number;
    name: string;
    surName: string;
    patronymic: string;
    email: string;
    subGroup: boolean;
    isGroupLeader: boolean;
    isMarking: boolean;
};
