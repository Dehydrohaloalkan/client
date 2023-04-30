import { gql } from '@apollo/client';

export const GET_GROUP = gql`
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
}
