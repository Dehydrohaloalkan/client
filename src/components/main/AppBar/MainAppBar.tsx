import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';
import { useContext, useState } from 'react';
import { Context } from '../../GlobalContext';
import MainLogo from './MainLogo';
import MainProfileButton from './MainProfileButton';
import MainProfileMenu from './MainProfileMenu';

type Props = {};

const MainToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

function MainAppBar({}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <AppBar position='sticky' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <MainToolbar>
                <MainLogo />
                <MainProfileButton setOpen={setOpen} />
            </MainToolbar>
            <MainProfileMenu open={open} setOpen={setOpen} />
        </AppBar>
    );
}

export default MainAppBar;
