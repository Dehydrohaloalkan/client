import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../components/GlobalContext';
import { Role } from '../core/models/Role';
import AdminRouter from './AdminRouter';
import StudentRouter from './StudentRouter';
import TeacherRouter from './TeacherRouter';
import UnregisteredRouter from './UnregisteredRouter';
type Props = {};

function ComplexRouter({}: Props) {
    const { store } = useContext(Context);
    return (
        <>
            {store.isAuth ? (
                <>
                    {(store.user.role === Role.student ||
                        store.user.role === Role.leader ||
                        store.user.role === Role.marking) && <StudentRouter />}
                    {store.user.role === Role.teacher && <TeacherRouter />}
                    {store.user.role === Role.admin && <AdminRouter />}
                </>
            ) : (
                <UnregisteredRouter />
            )}
        </>
    );
}

export default observer(ComplexRouter);
