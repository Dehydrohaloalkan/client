import { BrowserRouter } from 'react-router-dom';
import GlobalContext from './components/GlobalContext';
import ComplexRouter from './routes/ComplexRouter';

function App() {
    return (
        <GlobalContext>
            <BrowserRouter>
                <ComplexRouter />
            </BrowserRouter>
        </GlobalContext>
    );
}

export default App;
