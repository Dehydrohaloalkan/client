import styled from '@emotion/styled';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Context } from '../../GlobalContext';
import MainLogo from './MainLogo';
import MainProfileMenu from './MainProfileMenu';

type Props = {};

const MainToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

function MainAppBar({}: Props) {
    const [open, setOpen] = useState(false);
    const { store } = useContext(Context);

    return (
        <AppBar position='sticky' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <MainToolbar>
                <MainLogo />
                <Typography
                    component={Button}
                    color={'white'}
                    onClick={() => setOpen(true)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Typography variant='body1' p={1}>
                        {`${store.user.name} ${store.user.surname}`}
                    </Typography>
                    <Avatar
                        // TODO Change
                        src='/src/assets/cat.jpg'
                    />
                </Typography>
            </MainToolbar>
            <MainProfileMenu open={open} setOpen={setOpen} />
        </AppBar>
    );
}

export default MainAppBar;
