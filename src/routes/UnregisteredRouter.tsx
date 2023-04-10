import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';

type Props = {};

function UnregisteredRouter({}: Props) {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage></LoginPage>} />
            <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
    );
}

export default UnregisteredRouter;
