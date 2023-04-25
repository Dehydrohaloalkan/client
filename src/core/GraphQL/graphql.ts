import {
    ApolloClient,
    ApolloLink,
    FetchResult,
    InMemoryCache,
    Observable,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql';
import { AuthService } from '../services';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        for (let err of graphQLErrors) {
            switch (err.extensions.code) {
                case 'UNAUTHENTICATED':
                    if (operation.operationName === 'refreshToken') return;

                    const observable = new Observable<FetchResult<Record<string, any>>>(
                        (observer) => {
                            (async () => {
                                try {
                                    const response = await AuthService.refresh();
                                    localStorage.setItem('token', response.accessToken);

                                    if (!response.accessToken) {
                                        throw new GraphQLError('Empty AccessToken');
                                    }

                                    const subscriber = {
                                        next: observer.next.bind(observer),
                                        error: observer.error.bind(observer),
                                        complete: observer.complete.bind(observer),
                                    };

                                    forward(operation).subscribe(subscriber);
                                } catch (err) {
                                    observer.error(err);
                                }
                            })();
                        }
                    );
                    return observable;
            }
        }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});
