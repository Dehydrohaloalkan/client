import { Menu, MenuItem } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../../GlobalContext';

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

function MainProfileMenu({ open, setOpen }: Props) {
    const { store } = useContext(Context);

    return (
        <Menu
            disableScrollLock={true}
            id='demo-positioned-menu'
            aria-labelledby='demo-positioned-button'
            open={open}
            onClose={() => setOpen(false)}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem onClick={() => store.logout()}>Logout</MenuItem>
        </Menu>
    );
}

export default observer(MainProfileMenu);
