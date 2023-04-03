import { Menu, MenuItem } from '@mui/material';

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

function MainProfileMenu({ open, setOpen }: Props) {
    return (
        <Menu
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
            <MenuItem>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
        </Menu>
    );
}

export default MainProfileMenu;
