import { ScheduleType } from '../types/Schedule';

export const dateToWeekDay = (date: Date): string => {
    let weekDay = date.toLocaleString('ru-RU', { weekday: 'long' });
    return weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
};

const schedule: ScheduleType[] = [
    {
        date: new Date('01.01.2002'),
        lessons: [
            {
                id: 1,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 2,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 3,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 4,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
        ],
    },
    {
        date: new Date('01.01.2002'),
        lessons: [
            {
                id: 5,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 6,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 7,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 8,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
        ],
    },
    {
        date: new Date('01.01.2002'),
        lessons: [
            {
                id: 9,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 10,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 11,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 12,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
        ],
    },
    {
        date: new Date('01.01.2002'),
        lessons: [
            {
                id: 13,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 14,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 15,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 16,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
        ],
    },
    {
        date: new Date('01.01.2002'),
        lessons: [
            {
                id: 17,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 18,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 19,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
            {
                id: 20,
                subject: {
                    id: 1,
                    name: 'Матеша',
                    type: 'ЛК',
                },
                startTime: new Date('01.01.2002'),
                endTime: new Date('01.01.2002'),
                location: '104-4',
            },
        ],
    },
    {
        date: new Date('01.06.2002'),
        lessons: [],
    },
];

export const getSchedule = async (week: number): Promise<ScheduleType[]> => {
    //await new Promise((r) => setTimeout(r, 2000));
    return schedule;
};
