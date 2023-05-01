import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import GroupIcon from '@mui/icons-material/Group';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { IRoute } from '../core/models/route/IRoute';
import Admins from '../pages/admin/Admins';
import Groups from '../pages/admin/Groups';
import Students from '../pages/admin/Students';
import Teachers from '../pages/admin/Teachers';

const adminRoutes: IRoute[] = [
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
        description: 'On this page you can find the schedule of classes for your group',
    },
    {
        name: 'Groups',
        route: 'groups',
        path: 'groups',
        element: <Groups />,
        icon: <AutoAwesomeMosaicIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description: 'On this page you can find the schedule of classes for your group',
    },
    {
        name: 'Teachers',
        route: 'teachers',
        path: 'teachers',
        element: <Teachers />,
        icon: <GroupIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description: 'On this page you can find the schedule of classes for your group',
    },
    {
        name: 'Admins',
        route: 'admins',
        path: 'admins',
        element: <Admins />,
        icon: <GroupIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description: 'On this page you can find the schedule of classes for your group',
    },
];

type Props = {};

function AdminRouter({}: Props) {
    return (
        <Routes>
            <Route path='/' element={<MainLayout routes={adminRoutes} />}>
                <Route index element={<MainButtonList routes={adminRoutes} />} />
                {adminRoutes.map((item, index) => (
                    <Route element={item.element} path={item.route} key={index} />
                ))}
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
}

export default AdminRouter;
