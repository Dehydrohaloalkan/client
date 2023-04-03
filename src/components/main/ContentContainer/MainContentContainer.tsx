import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { drawerWidth } from '../SideBar/MainSideBar';

const PageTemplate = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: `calc(100% - ${drawerWidth}) `,
    paddingLeft: drawerWidth,
});

type Props = {
    header: string;
    children: JSX.Element;
};

function MainContentContainer({ header, children }: Props) {
    return (
        <PageTemplate>
            <Typography variant='h3' p={2}>
                {header}
            </Typography>
            {children}
        </PageTemplate>
    );
}

export default MainContentContainer;
