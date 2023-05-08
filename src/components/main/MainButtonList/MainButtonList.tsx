import { Grid } from '@mui/material';
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
                alignItems={'stretch'}
                sx={{
                    p: 2,
                }}
            >
                {routes.map((item, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <MainButtonListItem item={item} />
                    </Grid>
                ))}
            </Grid>
        </MainContentContainer>
    );
}

export default MainButtonList;
