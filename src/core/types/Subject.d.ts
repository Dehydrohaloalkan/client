export type SubjectType = {
    id: number;
    type: string;
    name: string;
    startDate: Date;
    endDate: Date;
    teacher: {
        id: number;
        fullName: string;
    };
};
