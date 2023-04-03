import { SubjectType } from '../types/Subject';

const subjects: SubjectType[] = [
    {
        id: 1,
        name: 'Математика',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 2,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 3,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 1,
        name: 'Математика',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 2,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 3,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 1,
        name: 'Математика',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 2,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 3,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 1,
        name: 'Математика',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 2,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 3,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 1,
        name: 'Математика',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 2,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
    {
        id: 3,
        name: 'Русский язык',
        startDate: new Date('01.01.2003'),
        endDate: new Date('01.01.2004'),
        teacher: {
            id: 1,
            fullName: 'Мария Ивановна',
        },
        type: 'ЛК',
    },
];

export const getSubjects = async (): Promise<SubjectType[]> => {
    return subjects;
};
