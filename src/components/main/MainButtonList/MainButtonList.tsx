import Grid from '@mui/material/Unstable_Grid2';
import { RouteType } from '../../../core/types/Route';
import MainContentContainer from '../ContentContainer/MainContentContainer';
import MainButtonListItem from './MainButtonListItem';

type Props = {
    routes: RouteType[];
};

function MainButtonList({ routes }: Props) {
    return (
        <MainContentContainer header='Pages'>
            <Grid
                container
                spacing={2}
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {routes.map((item, index) => (
                    <Grid xs='auto' sx={{ maxWidth: 600 }}>
                        <MainButtonListItem item={item} key={index} />
                    </Grid>
                ))}
            </Grid>
        </MainContentContainer>
    );
}

export default MainButtonList;
