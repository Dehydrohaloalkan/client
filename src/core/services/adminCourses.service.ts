import { gql } from '@apollo/client';

export const GET_ALL_COURSES = gql`
    query getAllCourses {
        courses {
            id
            name
            startDate
            endDate
            form
        }
    }
`;

export interface IFetchAllCourses {
    courses: ICourse[];
}

export interface ICourse {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    form: number;
}

export const CREATE_COURSE = gql`
    mutation createCourse($name: String!, $startDate: DateTime!, $endDate: DateTime!, $form: Int!) {
        createCourse(
            createCourseInput: {
                name: $name
                startDate: $startDate
                endDate: $endDate
                form: $form
            }
        ) {
            id
        }
    }
`;

export interface ICreateCourse {
    id: number;
}

export const UPDATE_COURSE = gql`
    mutation updateCourse(
        $id: Int!
        $name: String
        $startDate: DateTime
        $endDate: DateTime
        $form: Int
    ) {
        updateCourse(
            updateCourseInput: {
                id: $id
                name: $name
                startDate: $startDate
                endDate: $endDate
                form: $form
            }
        ) {
            id
        }
    }
`;

export interface IUpdateCourse {
    id: number;
}

export const REMOVE_COURSE = gql`
    mutation removeCourse($id: Int!) {
        removeCourse(id: $id) {
            id
        }
    }
`;

export interface IRemoveCourse {
    id: number;
}
