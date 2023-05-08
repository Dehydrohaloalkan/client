import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import GroupIcon from '@mui/icons-material/Group';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainButtonList from '../components/main/MainButtonList/MainButtonList';
import MainLayout from '../components/main/MainLayout';
import { IRoute } from '../core/models/route/IRoute';
import Admins from '../pages/admin/Admins';
import Courses from '../pages/admin/Courses';
import Groups from '../pages/admin/Groups';
import Students from '../pages/admin/Students';
import Subjects from '../pages/admin/Subjects';
import Teachers from '../pages/admin/Teachers';

const adminRoutes: IRoute[] = [
    {
        name: 'Students',
        route: 'students',
        path: 'students',
        element: <Students />,
        icon: <GroupIcon />,
        picture: {
            src: 'src/assets/4.jpg',
            alt: 'abstract picture',
        },
        description: 'This page provides a list of all students.',
    },
    {
        name: 'Groups',
        route: 'groups',
        path: 'groups',
        element: <Groups />,
        icon: <AutoAwesomeMosaicIcon />,
        picture: {
            src: 'src/assets/5.jpg',
            alt: 'abstract picture',
        },
        description: 'This page provides a list of all groups.',
    },
    {
        name: 'Teachers',
        route: 'teachers',
        path: 'teachers',
        element: <Teachers />,
        icon: <GroupIcon />,
        picture: {
            src: 'src/assets/1.jpg',
            alt: 'abstract picture',
        },
        description: 'This page provides a list of all teachers.',
    },
    {
        name: 'Admins',
        route: 'admins',
        path: 'admins',
        element: <Admins />,
        icon: <GroupIcon />,
        picture: {
            src: 'src/assets/3.jpg',
            alt: 'abstract picture',
        },
        description: 'This page provides a list of all admins.',
    },
    {
        name: 'Courses',
        route: 'courses',
        path: 'courses',
        element: <Courses />,
        icon: <RecordVoiceOverIcon />,
        picture: {
            src: 'src/assets/2.jpg',
            alt: 'abstract picture',
        },
        description: 'This page provides a list of all courses.',
    },
    {
        name: 'Subjects',
        route: 'subjects',
        path: 'subjects',
        element: <Subjects />,
        icon: <SubtitlesIcon />,
        picture: {
            src: 'src/assets/10.png',
            alt: 'abstract picture',
        },
        description: 'This page provides a list of all subjects.',
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
