import { gql } from '@apollo/client';

export const GET_GRADES = gql`
    query getGrades($id: String!) {
        studentByUser(id: $id) {
            grades {
                value
                lesson {
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

export interface IFetchStudentGrades {
    studentByUser: {
        grades: IStudentGrade[];
    };
}

export interface IStudentGrade {
    value: number;
    lesson: {
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
    };
}
