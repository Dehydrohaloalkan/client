import { gql } from '@apollo/client';

export const GET_ALL_GROUPS = gql`
    query getAllGroups {
        groups {
            id
            number
            form
            students {
                isLeader
            }
        }
    }
`;

export interface IFetchAllGroups {
    groups: IGroup[];
}

export interface IGroup {
    id: number;
    number: string;
    form: number;
    students?: {
        isLeader: boolean;
    }[];
}

export const CREATE_GROUP = gql`
    mutation createGroup($number: String!, $form: Int!) {
        createGroup(createGroupInput: { number: $number, form: $form }) {
            id
        }
    }
`;

export interface ICreateGroup {
    id: number;
}

export const UPDATE_GROUP = gql`
    mutation updateGroup($id: Int!, $number: String!, $form: Int!) {
        updateGroup(updateGroupInput: { id: $id, number: $number, form: $form }) {
            id
        }
    }
`;

export interface IUpdateGroup {
    id: number;
}

export const REMOVE_GROUP = gql`
    mutation removeGroup($id: Int!) {
        removeGroup(id: $id) {
            id
        }
    }
`;

export interface IRemoveGroup {
    id: number;
}
