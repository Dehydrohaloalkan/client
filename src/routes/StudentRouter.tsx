import CancelIcon from '@mui/icons-material/Cancel';
import ClassIcon from '@mui/icons-material/Class';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GradeIcon from '@mui/icons-material/Grade';
import GroupIcon from '@mui/icons-material/Group';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '../components/GlobalContext';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { Role } from '../core/models/auth/Role';
import { IRoute } from '../core/models/route/IRoute';
import Absences from '../pages/student/Absences';
import Grades from '../pages/student/Grades';
import Group from '../pages/student/Group';
import GroupPasses from '../pages/student/GroupPasses';
import Schedule from '../pages/student/Schedule';
import Subjects from '../pages/student/Subjects';

type Props = {};

const studentRoutes: IRoute[] = [
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
        description: 'On this page you can find the schedule of classes for your group',
    },
    {
        name: 'Group',
        route: 'group',
        path: 'group',
        element: <Group />,
        icon: <GroupIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description: 'On this page you can find the information about your group',
    },
    {
        name: 'Subjects',
        route: 'subjects',
        path: 'subjects',
        element: <Subjects />,
        icon: <ClassIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description: 'On this page you can find the information about your subjects',
    },
    {
        name: 'Absences',
        route: 'absences',
        path: 'absences',
        element: <Absences />,
        icon: <CancelIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description: 'On this page you can find the information about your passes',
    },
    {
        name: 'Grades',
        route: 'grades',
        path: 'grades',
        element: <Grades />,
        icon: <GradeIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description: 'On this page you can find the information about your grades',
    },
];

const addMarkingRoutes = () => {
    studentRoutes.push({
        name: 'Add Passes',
        route: 'passes/edit/:week',
        path: 'passes/edit/0',
        element: <GroupPasses />,
        icon: <CrisisAlertIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description: 'On this page you can add passes',
    });
};

function StudentRouter({}: Props) {
    const { store } = useContext(Context);

    if (store.user.role == Role.leader || store.user.role == Role.marking) addMarkingRoutes();

    return (
        <Routes>
            <Route path='/' element={<MainLayout routes={studentRoutes} />}>
                <Route index element={<MainButtonList routes={studentRoutes} />} />
                {studentRoutes.map((item, index) => (
                    <Route element={item.element} path={item.route} key={index} />
                ))}
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
}

export default StudentRouter;
