import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
                <ComplexRouter />
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default observer(App);
