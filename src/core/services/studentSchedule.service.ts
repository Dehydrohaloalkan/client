import { gql } from '@apollo/client';

export const GET_STUDENT_SCHEDULE = gql`
    query getStudentSchedule($id: String!, $week: Int!) {
        studentByUser(id: $id) {
            group {
                schedule(week: $week) {
                    lessons {
                        startTime
                        endTime
                        location
                        subject {
                            course {
                                name
                            }
                            type {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
`;

export interface IFetchStudentSchedule {
    studentByUser: {
        group: {
            schedule: IStudentSchedule;
        };
    };
}

export interface IStudentSchedule {
    lessons: ILesson[];
}

export interface ILesson {
    id?: string;
    startTime: Date;
    endTime: Date;
    location: string;
    subject: {
        groups?: {
            number: string;
        }[];
        course: {
            name: string;
        };
        type: {
            name: string;
        };
    };
}

export function groupLessonsByDayOfWeek(
    lessons: ILesson[],
    week = 0
): { date: Date; lessons: ILesson[] }[] {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDate = new Date();
    const firstDayOfWeek = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 2
    );
    const targetWeekStartDate = new Date(firstDayOfWeek.getTime() + week * 7 * 24 * 60 * 60 * 1000);

    const lessonsByDayOfWeek = lessons.reduce((acc: { [key: string]: ILesson[] }, lesson) => {
        const dayOfWeek = daysOfWeek[new Date(lesson.startTime).getDay() - 1];
        if (!acc[dayOfWeek]) {
            acc[dayOfWeek] = [];
        }
        acc[dayOfWeek].push(lesson);
        return acc;
    }, {});

    return daysOfWeek.map((dayOfWeek) => {
        const date = new Date(
            targetWeekStartDate.getTime() +
                (daysOfWeek.indexOf(dayOfWeek) - 1) * 24 * 60 * 60 * 1000
        );
        return {
            date,
            lessons: lessonsByDayOfWeek[dayOfWeek]
                ? lessonsByDayOfWeek[dayOfWeek].sort(
                      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
                  )
                : [],
        };
    });
}
