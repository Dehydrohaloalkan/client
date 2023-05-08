import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GradeIcon from '@mui/icons-material/Grade';
import GroupIcon from '@mui/icons-material/Group';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { IRoute } from '../core/models/route/IRoute';
import GroupsAbsences from '../pages/teacher/GroupsAbsences';
import GroupsGrades from '../pages/teacher/GroupsGrades';
import GroupsLists from '../pages/teacher/GroupsLists';
import Schedule from '../pages/teacher/Schedule';

const teacherRoutes: IRoute[] = [
    {
        name: 'Schedule',
        route: 'schedule/:week',
        path: 'schedule/0',
        element: <Schedule />,
        icon: <EventNoteIcon />,
        picture: {
            src: 'src/assets/7.jpg',
            alt: 'abstract picture',
        },
        description: 'This page displays the schedule for a teacher.',
    },
    {
        name: 'Groups Lists',
        route: 'groups',
        path: 'groups',
        element: <GroupsLists />,
        icon: <GroupIcon />,
        picture: {
            src: 'src/assets/8.jpg',
            alt: 'abstract picture',
        },
        description: 'This page allows you to view the lists of groups.',
    },
    {
        name: 'Groups Absences',
        route: 'groupsAbsences/:week',
        path: 'groupsAbsences/0',
        element: <GroupsAbsences />,
        icon: <CrisisAlertIcon />,
        picture: {
            src: 'src/assets/9.jpg',
            alt: 'abstract picture',
        },
        description: 'This page enables you to mark absences for various groups.',
    },
    {
        name: 'Groups Grades',
        route: 'groupsGrades/:week',
        path: 'groupsGrades/0',
        element: <GroupsGrades />,
        icon: <GradeIcon />,
        picture: {
            src: 'src/assets/10.png',
            alt: 'abstract picture',
        },
        description: 'This page allows you to enter grades for various groups.',
    },
];

type Props = {};

function TeacherRouter({}: Props) {
    return (
        <Routes>
            <Route path='/' element={<MainLayout routes={teacherRoutes} />}>
                <Route index element={<MainButtonList routes={teacherRoutes} />} />
                {teacherRoutes.map((item, index) => (
                    <Route element={item.element} path={item.route} key={index} />
                ))}
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
}

export default TeacherRouter;
