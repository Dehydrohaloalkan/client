import { gql } from '@apollo/client';

export const GET_ALL_SUBJECTS = gql`
    query getAllSubjects {
        subjects {
            id
            course {
                id
                name
            }
            type {
                id
                name
            }
            teacher {
                id
                name
                surname
            }
            groups {
                id
                number
            }
            recurrence
        }
    }
`;

export interface IFetchAllSubjects {
    subjects: ISubject[];
}

export interface ISubject {
    id: number;
    course: {
        id: number;
        name: string;
    };
    type: {
        id: number;
        name: string;
    };
    teacher: {
        id: string;
        name: string;
        surname: string;
    };
    groups: {
        id: number;
        number: string;
    }[];
    recurrence: string;
}

export interface ICreateUpdateSubject {
    id?: number;
    courseId: number;
    typeId: number;
    teacherId: string;
    groups: number[];
    recurrence: string;
}

export interface IRecurrence {
    week?: IRecurrenceWeekDay[];
}

export interface IRecurrenceWeekDay {
    dayNumber: number;
    lessonsInfo: IRecurrenceLessonInfo[];
}

export interface IRecurrenceLessonInfo {
    startTime: string;
    endTime: string;
    location: string;
    teacherId?: string;
}

export const GET_ALL_TYPES = gql`
    query getAllTypes {
        types {
            id
            name
        }
    }
`;

export interface IFetchAllTypes {
    types: IType[];
}

export interface IType {
    id: number;
    name: string;
}

export const CREATE_SUBJECT = gql`
    mutation createSubjectWithGroups(
        $courseId: Int!
        $typeId: Int!
        $teacherId: String!
        $recurrence: String!
        $groupIds: [Int!]!
    ) {
        createSubjectWithGroups(
            createSubjectInput: {
                courseId: $courseId
                typeId: $typeId
                teacherId: $teacherId
                recurrence: $recurrence
            }
            groupIds: $groupIds
        ) {
            id
        }
    }
`;

export const UPDATE_SUBJECT = gql`
    mutation updateSubject(
        $id: Int!
        $courseId: Int!
        $typeId: Int!
        $teacherId: String!
        $recurrence: String!
        $groupIds: [Int!]!
    ) {
        updateSubjectWithGroups(
            updateSubjectInput: {
                id: $id
                courseId: $courseId
                typeId: $typeId
                teacherId: $teacherId
                recurrence: $recurrence
            }
            groupIds: $groupIds
        ) {
            id
        }
    }
`;

export const REMOVE_SUBJECT = gql`
    mutation removeSubject($id: Int!) {
        removeSubject(id: $id) {
            id
        }
    }
`;
