import GroupIcon from '@mui/icons-material/Group';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { RouteType } from '../core/types/Route';
import Students from '../pages/admin/Students';

const adminRoutes: RouteType[] = [
    {
        name: 'Students',
        route: 'students',
        path: 'students',
        element: <Students />,
        icon: <GroupIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description:
            'On this page you can find the schedule of classes for your group',
    },
];

type Props = {};

function AdminRouter({}: Props) {
    return (
        <Routes>
            <Route path='/' element={<MainLayout routes={adminRoutes} />}>
                <Route
                    index
                    element={<MainButtonList routes={adminRoutes} />}
                />
                {adminRoutes.map((item, index) => (
                    <Route
                        element={item.element}
                        path={item.route}
                        key={index}
                    />
                ))}
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
}

export default AdminRouter;
