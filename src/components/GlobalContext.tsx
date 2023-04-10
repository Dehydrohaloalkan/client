import { createContext } from 'react';
import Store from '../core/store/store';

export type ContextType = {
    store: Store;
};

const store = new Store();

export const Context = createContext<ContextType>({ store });

type Props = {
    children: JSX.Element;
};

function GlobalContext({ children }: Props) {
    return <Context.Provider value={{ store }}>{children}</Context.Provider>;
}

export default GlobalContext;

// {
// id: '530d7ac4-2167-4e2f-9da2-d47289ca807b',
// role: 'GroupLeader',
// name: 'Alex',
// surName: 'Man',
// patronymic: 'Woman',
// email: 'test@gmail.com',
// student: {
//     groupId: 1,
// },
// }
