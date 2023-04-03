import styled from '@emotion/styled';
import { Drawer, List, Toolbar } from '@mui/material';
import { RouteType } from '../../../core/types/Route';
import MainSideBarItem from './MainSideBarItem';

type Props = {
    items: RouteType[];
};

export const drawerWidth = 200;

const WideDrawer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
});

function MainSideBar({ items }: Props) {
    return (
        <WideDrawer variant='permanent'>
            <Toolbar />
            <List>
                {items.map((item, index) => {
                    return (
                        <MainSideBarItem
                            icon={item.icon}
                            text={item.name}
                            path={item.path}
                            key={index}
                        />
                    );
                })}
            </List>
        </WideDrawer>
    );
}

export default MainSideBar;
