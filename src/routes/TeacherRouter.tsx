import EventNoteIcon from '@mui/icons-material/EventNote';
import GroupIcon from '@mui/icons-material/Group';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { RouteType } from '../core/types/Route';
import Schedule from '../pages/public/Schedule';
import GroupsLists from '../pages/teacher/GroupsLists';

const teacherRoutes: RouteType[] = [
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
    {
        name: 'Groups',
        route: 'groups',
        path: 'groups',
        element: <GroupsLists />,
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

function TeacherRouter({}: Props) {
    return (
        <Routes>
            <Route path='/' element={<MainLayout routes={teacherRoutes} />}>
                <Route
                    index
                    element={<MainButtonList routes={teacherRoutes} />}
                />
                {teacherRoutes.map((item, index) => (
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

export default TeacherRouter;
