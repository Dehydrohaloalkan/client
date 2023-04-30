import Grid from '@mui/material/Unstable_Grid2';
import { IRoute } from '../../../core/models/route/IRoute';
import MainContentContainer from '../ContentContainer/MainContentContainer';
import MainButtonListItem from './MainButtonListItem';

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
                    <Grid xs='auto' sx={{ width: 500 }} key={index}>
                        <MainButtonListItem item={item} />
                    </Grid>
                ))}
            </Grid>
        </MainContentContainer>
    );
}

export default MainButtonList;
