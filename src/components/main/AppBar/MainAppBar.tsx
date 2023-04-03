import styled from '@emotion/styled';
import { AppBar, Avatar, Toolbar } from '@mui/material';
import { useState } from 'react';
import MainLogo from './MainLogo';
import MainProfileMenu from './MainProfileMenu';

type Props = {};

const MainToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

function MainAppBar({}: Props) {
    const [open, setOpen] = useState(false);
    return (
        <AppBar
            position='sticky'
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <MainToolbar>
                <MainLogo />
                <Avatar
                    onClick={() => setOpen(true)}
                    // TODO Change
                    src='src/assets/cat.jpg'
                />
            </MainToolbar>
            <MainProfileMenu open={open} setOpen={setOpen} />
        </AppBar>
    );
}

export default MainAppBar;
