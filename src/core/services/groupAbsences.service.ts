import { gql } from '@apollo/client';

export const GET_GROUP_FOR_ABSENCES = gql`
    query getGroup($id: String!) {
        studentByUser(id: $id) {
            group {
                id
                students {
                    studentId
                    name
                    surname
                }
            }
        }
    }
`;

export interface IFetchGroupForAbsences {
    studentByUser: {
        group: {
            id: string;
            students: IGroupStudent[];
        };
    };
}

export interface IGroupStudent {
    studentId: string;
    name: string;
    surname: string;
}

export const GET_GROUP_SCHEDULE = gql`
    query getGroupSchedule($groupId: Int!, $week: Int!) {
        group(id: $groupId) {
            schedule(week: $week) {
                lessons {
                    id
                    startTime
                    endTime
                    subject {
                        course {
                            name
                        }
                        type {
                            name
                        }
                    }
                    location
                }
            }
        }
    }
`;

export interface IFetchGroupSchedule {
    group: {
        schedule: IGroupSchedule;
    };
}

export interface IGroupSchedule {
    lessons: ILesson[];
}

export interface ILesson {
    id: string;
    startTime: Date;
    endTime: Date;
    subject: {
        course: {
            name: string;
        };
        type: {
            name: string;
        };
    };
    location: string;
}

export const GET_GROUP_ABSENCES = gql`
    query getGroupAbsences($groupId: Int!, $week: Int!) {
        group(id: $groupId) {
            absences(week: $week) {
                studentId
                lessonId
            }
        }
    }
`;

export interface IFetchGroupAbsences {
    group: {
        absences: IGroupAbsence[];
    };
}

export interface IGroupAbsence {
    studentId: string;
    lessonId: string;
}

export interface IGroupScheduleForAbsencesAndGrades {
    days: IGroupScheduleDay[];
}

export const ADD_GROUP_ABSENCE = gql`
    mutation addAbsence($lessonId: String!, $studentId: String!) {
        createAbsence(createAbsenceInput: { lessonId: $lessonId, studentId: $studentId }) {
            lessonId
            studentId
        }
    }
`;

export interface IAddGroupAbsence {
    createAbsence: IGroupAbsence;
}

export const REMOVE_GROUP_ABSENCE = gql`
    mutation removeAbsence($lessonId: String!, $studentId: String!) {
        removeAbsence(lessonId: $lessonId, studentId: $studentId) {
            lessonId
            studentId
        }
    }
`;

export interface IRemoveGroupAbsence {
    removeAbsence: IGroupAbsence;
}

export interface IGroupScheduleDay {
    date: Date;
    lessons: ILesson[];
}

export function createGroupScheduleForAbsencesAndGrades(
    schedule?: IGroupSchedule
): IGroupScheduleForAbsencesAndGrades {
    const scheduleForAbsences: IGroupScheduleForAbsencesAndGrades = { days: [] };

    type LessonsByDate = {
        [date: string]: ILesson[];
    };

    // Group lessons by date
    const lessonsByDate = schedule?.lessons.reduce((acc: LessonsByDate, lesson) => {
        const date = new Date(lesson.startTime).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(lesson);
        return acc;
    }, {});

    // Convert grouped lessons to days in scheduleForAbsences
    for (const date in lessonsByDate) {
        const lessons = lessonsByDate[date];
        scheduleForAbsences.days.push({ date: new Date(date), lessons });
    }

    // sort days in scheduleForAbsences
    scheduleForAbsences.days.sort((a, b) => a.date.getDate() - b.date.getDate());

    // sort lessons in each day
    scheduleForAbsences.days.forEach((day) => {
        day.lessons.sort(
            (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
    });

    return scheduleForAbsences;
}
