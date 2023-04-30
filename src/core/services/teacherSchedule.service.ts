import { gql } from '@apollo/client';
import { ILesson } from './studentSchedule.service';

export const GET_TEACHER_SCHEDULE = gql`
    query getTeacherSchedule($teacherId: String!, $week: Int!) {
        teacherSchedule(week: $week, teacherId: $teacherId) {
            lessons {
                startTime
                endTime
                location
                subject {
                    groups {
                        number
                    }
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
`;

export interface IFetchTeacherSchedule {
    teacherSchedule: {
        lessons: ILesson[];
    };
}
