import { BrowserRouter } from 'react-router-dom';
import GlobalContext from './components/GlobalContext';
import StudentRouter from './routes/StudentRouter';

function App() {
    return (
        <GlobalContext>
            <BrowserRouter>
                <StudentRouter />
            </BrowserRouter>
        </GlobalContext>
    );
}

export default App;
