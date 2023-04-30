import { gql } from '@apollo/client';
import { IStudentGroup } from './studentGroup.service';

export const GET_TEACHER_SUBJECTS = gql`
    query getTeacherSubjects($id: String!) {
        user(id: $id) {
            subjects {
                id
                course {
                    name
                }
                type {
                    name
                }
            }
        }
    }
`;

export interface IFetchTeacherSubjects {
    user: {
        subjects: ITeacherSubject[];
    };
}

export interface ITeacherSubject {
    id: number;
    course: {
        name: string;
    };
    type: {
        name: string;
    };
}

export const GET_SUBJECT_GROUPS = gql`
    query getSubjectGroups($subjectId: Int!) {
        subject(id: $subjectId) {
            groups {
                id
                number
            }
        }
    }
`;

export interface IFetchSubjectGroups {
    subject: {
        groups: ISubjectGroup[];
    };
}

export interface ISubjectGroup {
    id: number;
    number: string;
}

export const GET_GROUP_BY_GROUP_ID = gql`
    query getGroup($groupId: Int!) {
        group(id: $groupId) {
            number
            form
            students {
                studentId
                name
                surname
                patronymic
                email
                isLeader
                isMarking
                subgroup
            }
        }
    }
`;

export interface IFetchGroupByGroupId {
    group: IStudentGroup;
}
