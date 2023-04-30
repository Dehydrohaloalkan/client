import { gql } from '@apollo/client';

export const GET_ABSENCES = gql`
    query getAbsences($id: String!) {
        studentByUser(id: $id) {
            absences {
                hours
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

export interface IFetchStudentAbsences {
    studentByUser: {
        absences: IStudentAbsence[];
    };
}

export interface IStudentAbsence {
    hours: number;
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
