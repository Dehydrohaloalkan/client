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
    const [user, setUser] = useState<AuthType>({
        role: 'GroupLeader',
        name: 'Alex',
        surName: 'Man',
    });

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
