import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './components/GlobalContext';
import ComplexRouter from './routes/ComplexRouter';

function App() {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    return (
        <BrowserRouter>
            <ComplexRouter />
        </BrowserRouter>
    );
}

export default observer(App);
