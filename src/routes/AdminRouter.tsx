import EventNoteIcon from '@mui/icons-material/EventNote';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { RouteType } from '../core/types/Route';
import Schedule from '../pages/public/Schedule';

const adminRoutes: RouteType[] = [
    {
        name: 'Schedule',
        route: 'schedule/:week',
        path: 'schedule/0',
        element: <Schedule />,
        icon: <EventNoteIcon />,
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
