import { ApolloProvider } from '@apollo/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalContext from './components/GlobalContext';
import { client } from './core/GraphQL/graphql';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <GlobalContext>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </GlobalContext>
);
