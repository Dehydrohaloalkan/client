import CancelIcon from '@mui/icons-material/Cancel';
import ClassIcon from '@mui/icons-material/Class';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import EventNoteIcon from '@mui/icons-material/EventNote';
import GradeIcon from '@mui/icons-material/Grade';
import GroupIcon from '@mui/icons-material/Group';
import { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Context } from '../components/GlobalContext';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { Role } from '../core/models/auth/Role';
import { IRoute } from '../core/models/route/IRoute';
import Absences from '../pages/student/Absences';
import Grades from '../pages/student/Grades';
import Group from '../pages/student/Group';
import GroupAbsences from '../pages/student/GroupAbsences';
import Schedule from '../pages/student/Schedule';
import Subjects from '../pages/student/Subjects';

type Props = {};

function StudentRouter({}: Props) {
    const { store } = useContext(Context);

    const [routes, setRoutes] = useState<IRoute[]>([
        {
            name: 'Schedule',
            route: 'schedule/:week',
            path: 'schedule/0',
            element: <Schedule />,
            icon: <EventNoteIcon />,
            picture: {
                src: 'src/assets/1.jpg',
                alt: 'abstract picture',
            },
            description: 'This page allows you to view the weekly schedule for a specific group.',
        },
        {
            name: 'Group',
            route: 'group',
            path: 'group',
            element: <Group />,
            icon: <GroupIcon />,
            picture: {
                src: 'src/assets/2.jpg',
                alt: 'abstract picture',
            },
            description: 'This page displays the members of a specific group.',
        },
        {
            name: 'Subjects',
            route: 'subjects',
            path: 'subjects',
            element: <Subjects />,
            icon: <ClassIcon />,
            picture: {
                src: 'src/assets/3.jpg',
                alt: 'abstract picture',
            },
            description: 'This page provides a list of currently studied subjects.',
        },
        {
            name: 'Absences',
            route: 'absences',
            path: 'absences',
            element: <Absences />,
            icon: <CancelIcon />,
            picture: {
                src: 'src/assets/4.jpg',
                alt: 'abstract picture',
            },
            description: 'This page shows a list of absences from lessons.',
        },
        {
            name: 'Grades',
            route: 'grades',
            path: 'grades',
            element: <Grades />,
            icon: <GradeIcon />,
            picture: {
                src: 'src/assets/5.jpg',
                alt: 'abstract picture',
            },
            description: 'This page displays a list of grades by subject.',
        },
    ]);

    const addMarkingRoutes = () => {
        routes.push({
            name: 'Add Absences',
            route: 'absences/edit/:week',
            path: 'absences/edit/0',
            element: <GroupAbsences />,
            icon: <CrisisAlertIcon />,
            picture: {
                src: 'src/assets/6.jpg',
                alt: 'abstract picture',
            },
            description: 'On this page, you can mark students absent from lessons.',
        });
        setRoutes([...routes]);
    };

    const removeMarkingRoutes = () => {
        setRoutes(routes.filter((item) => item.name !== 'Add Absences'));
    };

    useEffect(() => {
        if (store.user.role == Role.leader || store.user.role == Role.marking) {
            addMarkingRoutes();
        } else {
            removeMarkingRoutes();
        }
    }, []);

    return (
        <Routes>
            <Route path='/' element={<MainLayout routes={routes} />}>
                <Route index element={<MainButtonList routes={routes} />} />
                {routes.map((item, index) => (
                    <Route element={item.element} path={item.route} key={index} />
                ))}
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
    );
}

export default StudentRouter;
