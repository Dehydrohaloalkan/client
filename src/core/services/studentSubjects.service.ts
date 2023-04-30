import { gql } from '@apollo/client';

export const GET_SUBJECTS = gql`
    query getSubjects($id: String!) {
        studentByUser(id: $id) {
            group {
                subjects {
                    course {
                        name
                        startDate
                        endDate
                    }
                    type {
                        name
                    }
                    teacher {
                        name
                        surname
                        patronymic
                    }
                }
            }
        }
    }
`;

export interface IFetchStudentSubjects {
    studentByUser: {
        group: {
            subjects: IStudentSubject[];
        };
    };
}

export interface IStudentSubject {
    course: {
        name: string;
        startDate: Date;
        endDate: Date;
    };
    type: {
        name: string;
    };
    teacher: {
        name: string;
        surname: string;
        patronymic: string;
    };
}
