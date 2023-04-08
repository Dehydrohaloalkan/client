import { createContext, useState } from 'react';
import { AuthType } from '../core/types/Auth';

export type ContextType = {
    user?: AuthType;
    setUser?: Function;
};

export const Context = createContext<ContextType>({});

type Props = {
    children: JSX.Element;
};

function GlobalContext({ children }: Props) {
    const [user, setUser] = useState<AuthType>();
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

    return (
        <Context.Provider
            value={{
                user: user,
                setUser: setUser,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export default GlobalContext;
