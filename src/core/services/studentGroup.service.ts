import { gql } from '@apollo/client';

export const GET_GROUP_WITH_STUDENTS = gql`
    query getGroup($id: String!) {
        studentByUser(id: $id) {
            group {
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
    }
`;

export interface IFetchStudentGroup {
    studentByUser: { group: IStudentGroup };
}

export interface IStudentGroup {
    number: string;
    form: string;
    students: IStudent[];
}

export interface IStudent {
    studentId: string;
    name: string;
    surname: string;
    patronymic?: string;
    email: string;
    isLeader: boolean;
    isMarking: boolean;
    subgroup: boolean;
    groupId?: number;
    group?: {
        id: number;
        number: string;
    };
}

export const UPDATE_STUDENT = gql`
    mutation updateStudent(
        $studentId: String!
        $name: String
        $surname: String
        $patronymic: String
        $email: String
        $subgroup: Boolean
        $isLeader: Boolean
        $isMarking: Boolean
        $groupId: Int
    ) {
        updateStudent(
            updateStudentInput: {
                studentId: $studentId
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

export interface IUpdateStudent {
    updateStudent: { studentId: string };
}
