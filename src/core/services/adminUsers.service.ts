import { gql } from '@apollo/client';

export const GET_ALL_TEACHERS = gql`
    query getTeachers {
        teachers {
            id
            name
            surname
            patronymic
            email
        }
    }
`;

export interface IFetchAllTeachers {
    teachers: IUser[];
}

export interface IUser {
    id: string;
    name: string;
    surname: string;
    patronymic?: string;
    email: string;
}

export const GET_ALL_ADMINS = gql`
    query getAdmins {
        admins {
            id
            name
            surname
            patronymic
            email
        }
    }
`;

export interface IFetchAllAdmins {
    admins: IUser[];
}

export const CREATE_USER = gql`
    mutation createUser(
        $name: String!
        $surname: String!
        $patronymic: String!
        $email: String!
        $roleId: Int!
    ) {
        createUser(
            createUserInput: {
                name: $name
                surname: $surname
                patronymic: $patronymic
                email: $email
                roleId: $roleId
            }
        ) {
            id
        }
    }
`;

export interface IFetchCreateUser {
    createUser: {
        id: string;
    };
}

export const REMOVE_USER = gql`
    mutation removeUser($id: String!) {
        removeUser(id: $id) {
            id
        }
    }
`;

export interface IFetchRemoveUser {
    removeUser: {
        id: string;
    };
}

export const UPDATE_USER = gql`
    mutation updateUser(
        $id: String!
        $name: String
        $surname: String
        $patronymic: String
        $email: String
    ) {
        updateUser(
            updateUserInput: {
                id: $id
                name: $name
                surname: $surname
                patronymic: $patronymic
                email: $email
            }
        ) {
            id
        }
    }
`;

export interface IFetchUpdateUser {
    updateUser: {
        id: string;
    };
}
