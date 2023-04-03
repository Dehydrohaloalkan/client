import { PassType } from '../types/Passes';

const passes: PassType[] = [
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Англ',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Русский',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Англ',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Русский',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Англ',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
    {
        lesson: {
            id: 1,
            name: 'Русский',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 8,
    },
];

export const getPasses = async (): Promise<PassType[]> => {
    return passes;
};
