import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { IRoute } from '../../core/models/route/IRoute';
import MainAppBar from './AppBar/MainAppBar';
import MainSideBar from './SideBar/MainSideBar';

type Props = {
    routes: IRoute[];
};

function MainLayout({ routes }: Props) {
    return (
        <>
            <MainAppBar />
            <Box width={'100%'}>
                <MainSideBar items={routes} />
                <Outlet />
            </Box>
        </>
    );
}

export default MainLayout;
