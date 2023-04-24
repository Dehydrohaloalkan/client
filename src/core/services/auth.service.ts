import { gql } from '@apollo/client';
import { client } from '../GraphQL/graphql';
import { IAuthResponse } from '../models';

export class AuthService {
    static async login(email: string, password: string): Promise<IAuthResponse> {
        const data = await client.mutate({
            mutation: gql`
                mutation login($email: String!, $password: String!) {
                    login(loginUserInput: { email: $email, password: $password }) {
                        accessToken
                        user {
                            id
                            name
                            surname
                            patronymic
                            role
                        }
                    }
                }
            `,
            variables: { email, password },
        });
        return data.data.login;
    }

    static async logout(): Promise<void> {
        const data = await client.mutate({
            mutation: gql`
                mutation {
                    logout {
                        id
                    }
                }
            `,
        });
        return;
    }

    static async refresh() {
        const data = await client.mutate({
            mutation: gql`
                mutation {
                    refresh {
                        accessToken
                        user {
                            id
                            name
                            surname
                            patronymic
                            role
                        }
                    }
                }
            `,
        });
        return data.data.refresh;
    }
}
