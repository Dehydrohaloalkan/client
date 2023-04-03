export type GroupType = {
    id: number;
    number: string;
    students: StudentType[];
};

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
