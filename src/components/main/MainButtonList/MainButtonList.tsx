import Grid from '@mui/material/Unstable_Grid2';
import MainContentContainer from '../ContentContainer/MainContentContainer';
import MainButtonListItem from './MainButtonListItem';
import { IRoute } from '../../../core/models/route/IRoute';

type Props = {
    routes: IRoute[];
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
                    <Grid xs='auto' sx={{ maxWidth: 600 }} key={index}>
                        <MainButtonListItem item={item} />
                    </Grid>
                ))}
            </Grid>
        </MainContentContainer>
    );
}

export default MainButtonList;
