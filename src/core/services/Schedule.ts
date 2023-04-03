import { ScheduleType } from '../types/Schedule';

export const dateToWeekDay = (date: Date): string => {
    let weekDay = date.toLocaleString('ru-RU', { weekday: 'long' });
    return weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
};

export const getSchedule = async (week: number): Promise<ScheduleType[]> => {
    console.log('🚀 ~ file: Schedule.ts:9 ~ getSchedule ~ week:', week);

    return [
        {
            date: new Date('01.01.2002'),
            subjects: [
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Английский Язык Английский Язык Английский Язык',
                    room: '104-4',
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                },
            ],
        },
        {
            date: new Date('01.02.2002'),
            subjects: [
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    grade: 7,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    grade: 9,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    grade: 8,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    grade: 9,
                },
            ],
        },
        {
            date: new Date('01.03.2002'),
            subjects: [
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    grade: 10,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    absence: true,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                },
            ],
        },
        {
            date: new Date('01.04.2002'),
            subjects: [
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    absence: true,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                },
            ],
        },
        {
            date: new Date('01.05.2002'),
            subjects: [
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    absence: true,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    absence: true,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    absence: true,
                },
                {
                    startTime: new Date('01.01.2002'),
                    endTime: new Date('01.01.2002'),
                    title: 'Математика',
                    room: '104-4',
                    absence: true,
                },
            ],
        },
        {
            date: new Date('01.06.2002'),
            subjects: [],
        },
    ];
};
