import CancelIcon from '@mui/icons-material/Cancel';
import ClassIcon from '@mui/icons-material/Class';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GradeIcon from '@mui/icons-material/Grade';
import GroupIcon from '@mui/icons-material/Group';
import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '../components/GlobalContext';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { RouteType } from '../core/types/Route';
import StudentGrades from '../pages/StudentGrades';
import StudentGroupWithEdit from '../pages/StudentGroupWithEdit';
import StudentPasses from '../pages/StudentPasses';
import StudentSchedule from '../pages/StudentSchedule';
import StudentSubjects from '../pages/StudentSubjects';

type Props = {};

const studentRoutes: RouteType[] = [
    {
        name: 'Schedule',
        route: 'schedule/:week',
        path: 'schedule/0',
        element: <StudentSchedule />,
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
        name: 'Group',
        route: 'group',
        path: 'group',
        element: <StudentGroupWithEdit />,
        icon: <GroupIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description:
            'On this page you can find the information about your group',
    },
    {
        name: 'Subjects',
        route: 'subjects',
        path: 'subjects',
        element: <StudentSubjects />,
        icon: <ClassIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description:
            'On this page you can find the information about your subjects',
    },
    {
        name: 'Passes',
        route: 'passes',
        path: 'passes',
        element: <StudentPasses />,
        icon: <CancelIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description:
            'On this page you can find the information about your passes',
    },
    {
        name: 'Grades',
        route: 'grades',
        path: 'grades',
        element: <StudentGrades />,
        icon: <GradeIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description:
            'On this page you can find the information about your grades',
    },
];

const addMarkingRoutes = () => {
    studentRoutes.push({
        name: 'Schedule',
        route: 'schedule/:week',
        path: 'schedule/0',
        element: <StudentSchedule />,
        icon: <EventNoteIcon />,
        picture: {
            //TODO Change
            src: 'src/assets/cat.jpg',
            alt: 'text',
        },
        description:
            'On this page you can find the schedule of classes for your group',
    });
};

function StudentRouter({}: Props) {
    const { user } = useContext(Context);

    if (user?.role == 'GroupLeader' || user?.role == 'Marking')
        addMarkingRoutes();

    return (
        <Routes>
            <Route path='/' element={<MainLayout routes={studentRoutes} />}>
                <Route
                    index
                    element={<MainButtonList routes={studentRoutes} />}
                />
                {studentRoutes.map((item, index) => (
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

export default StudentRouter;
