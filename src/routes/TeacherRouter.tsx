import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GradeIcon from '@mui/icons-material/Grade';
import GroupIcon from '@mui/icons-material/Group';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { RouteType } from '../core/types/Route';
import GroupsGrades from '../pages/teacher/GroupsGrades';
import GroupsLists from '../pages/teacher/GroupsLists';
import GroupsPasses from '../pages/teacher/GroupsPasses';
import Schedule from '../pages/teacher/Schedule';

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
        name: 'Groups Lists',
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
    {
        name: 'Groups Passes',
        route: 'groupsPasses/:week',
        path: 'groupsPasses/0',
        element: <GroupsPasses />,
        icon: <CrisisAlertIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description:
            'On this page you can find the schedule of classes for your group',
    },
    {
        name: 'Groups Grades',
        route: 'groupsGrades/:week',
        path: 'groupsGrades/0',
        element: <GroupsGrades />,
        icon: <GradeIcon />,
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
