import { gql } from '@apollo/client';
import { IStudent } from './studentGroup.service';

export const GET_ALL_STUDENTS = gql`
    query getAllStudents {
        students {
            studentId
            name
            surname
            patronymic
            email
            isLeader
            isMarking
            subgroup
            groupId
            group {
                id
                number
            }
        }
    }
`;

export interface IFetchAllStudents {
    students: IStudent[];
}

export const GET_ALL_GROUPS = gql`
    query getAllGroups {
        groups {
            id
            number
        }
    }
`;

export interface IFetchAllGroups {
    groups: {
        id: number;
        number: string;
    }[];
}

export const CREATE_STUDENT = gql`
    mutation createStudent(
        $name: String!
        $surname: String!
        $patronymic: String!
        $email: String!
        $subgroup: Boolean!
        $isLeader: Boolean!
        $isMarking: Boolean!
        $groupId: Int!
    ) {
        createStudent(
            createStudentInput: {
                name: $name
                surname: $surname
                patronymic: $patronymic
                email: $email
                subgroup: $subgroup
                isLeader: $isLeader
                isMarking: $isMarking
                groupId: $groupId
            }
        ) {
            studentId
        }
    }
`;

export interface IFetchCreateStudent {
    createStudent: {
        studentId: string;
    };
}

export const REMOVE_STUDENT = gql`
    mutation removeStudent($studentId: String!) {
        removeStudent(id: $studentId) {
            studentId
        }
    }
`;

export interface IFetchRemoveStudent {
    removeStudent: {
        studentId: string;
    };
}
