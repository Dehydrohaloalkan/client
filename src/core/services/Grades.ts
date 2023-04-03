import { GradeType } from '../types/Grades';

export const getGrades = async (): Promise<GradeType[]> => {
    return [
        {
            lesson: 'Math',
            date: new Date('01.01.2004'),
            grade: 10,
        },
        {
            lesson: 'Math',
            date: new Date('01.01.2004'),
            grade: 9,
        },
        {
            lesson: 'English',
            date: new Date('01.01.2004'),
            grade: 8,
        },
        {
            lesson: 'Math',
            date: new Date('01.01.2004'),
            grade: 10,
        },
        {
            lesson: 'Russian',
            date: new Date('01.01.2004'),
            grade: 9,
        },
        {
            lesson: 'English',
            date: new Date('01.01.2004'),
            grade: 8,
        },
        {
            lesson: 'Math',
            date: new Date('01.01.2004'),
            grade: 10,
        },
        {
            lesson: 'Math',
            date: new Date('01.01.2004'),
            grade: 9,
        },
        {
            lesson: 'English',
            date: new Date('01.01.2004'),
            grade: 8,
        },
        {
            lesson: 'Math',
            date: new Date('01.01.2004'),
            grade: 10,
        },
        {
            lesson: 'Russian',
            date: new Date('01.01.2004'),
            grade: 9,
        },
        {
            lesson: 'English',
            date: new Date('01.01.2004'),
            grade: 8,
        },
    ];
};
