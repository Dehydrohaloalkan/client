import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';

type Props = {};

function UnregisteredRouter({}: Props) {
    return (
        <Routes>
            <Route path='/' element={<LoginPage></LoginPage>} />
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
}

export default UnregisteredRouter;
