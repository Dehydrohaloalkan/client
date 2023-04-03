import { ScheduleType } from '../types/Schedule';

export const dateToWeekDay = (date: Date): string => {
    let weekDay = date.toLocaleString('ru-RU', { weekday: 'long' });
    return weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
};

const schedule = [
    {
        date: new Date('01.01.2002'),
        subjects: [
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
        ],
    },
    {
        date: new Date('01.01.2002'),
        subjects: [
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
        ],
    },
    {
        date: new Date('01.01.2002'),
        subjects: [
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
        ],
    },
    {
        date: new Date('01.01.2002'),
        subjects: [
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
        ],
    },
    {
        date: new Date('01.01.2002'),
        subjects: [
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
        ],
    },
    {
        date: new Date('01.06.2002'),
        subjects: [],
    },
];

export const getSchedule = async (week: number): Promise<ScheduleType[]> => {
    console.log('🚀 ~ file: Schedule.ts:9 ~ getSchedule ~ week:', week);

    return schedule;
};
