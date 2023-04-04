import { GradeType } from '../types/Grades';

const grades: GradeType[] = [
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        grade: 8,
    },
    
];

export const getGrades = async (): Promise<GradeType[]> => {
    return grades;
};
