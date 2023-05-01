import { gql } from '@apollo/client';
import { IGroupAbsence, IGroupSchedule, IGroupStudent } from './groupAbsences.service';

export const GET_GROUP_INFO_BY_GROUP_ID = gql`
    query getGroup($groupId: Int!) {
        group(id: $groupId) {
            id
            students {
                studentId
                name
                surname
            }
        }
    }
`;

export interface IFetchGroupInfo {
    group: {
        id: number;
        students: IGroupStudent[];
    };
}

export const GET_GROUP_SUBJECT_SCHEDULE = gql`
    query getGroupSubjectSchedule($groupId: Int!, $week: Int!, $subjectId: Int!) {
        group(id: $groupId) {
            subjectSchedule(week: $week, subjectId: $subjectId) {
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
                }
            }
        }
    }
`;

export interface IFetchGroupSubjectSchedule {
    group: {
        subjectSchedule: IGroupSchedule;
    };
}

export const GET_GROUP_SUBJECT_ABSENCES = gql`
    query getGroupSubjectAbsences($groupId: Int!, $week: Int!, $subjectId: Int!) {
        group(id: $groupId) {
            subjectAbsences(week: $week, subjectId: $subjectId) {
                studentId
                lessonId
            }
        }
    }
`;

export interface IFetchGroupSubjectAbsences {
    group: {
        subjectAbsences: IGroupAbsence[];
    };
}

export const GET_GROUP_SUBJECT_GRADES = gql`
    query getGroupSubjectGrades($groupId: Int!, $week: Int!, $subjectId: Int!) {
        group(id: $groupId) {
            subjectGrades(week: $week, subjectId: $subjectId) {
                studentId
                lessonId
                value
            }
        }
    }
`;

export interface IFetchGroupSubjectGrades {
    group: {
        subjectGrades: IGroupGrade[];
    };
}

export interface IGroupGrade {
    studentId: string;
    lessonId: string;
    value: number;
}
