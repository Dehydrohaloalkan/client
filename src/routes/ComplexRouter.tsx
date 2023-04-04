import { useContext } from 'react';
import { Context } from '../components/GlobalContext';
import AdminRouter from './AdminRouter';
import StudentRouter from './StudentRouter';
import TeacherRouter from './TeacherRouter';
import UnregisteredRouter from './UnregisteredRouter';
type Props = {};

function ComplexRouter({}: Props) {
    const { user } = useContext(Context);

    return (
        <>
            {(user?.role == 'Student' ||
                user?.role == 'GroupLeader' ||
                user?.role == 'Marking') && <StudentRouter />}
            {user?.role == 'Teacher' && <TeacherRouter />}
            {user?.role == 'Admin' && <AdminRouter />}
            {(user == undefined || user.role == undefined) && (
                <UnregisteredRouter />
            )}
        </>
    );
}

export default ComplexRouter;
