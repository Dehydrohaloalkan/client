import { useQuery } from '@apollo/client';
import { Button, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../components/GlobalContext';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import Loader from '../../components/main/Loader/Loader';
import ScheduleTable from '../../components/schedule/ScheduleTable';
import {
    GET_STUDENT_SCHEDULE,
    IFetchStudentSchedule,
    groupLessonsByDayOfWeek,
} from '../../core/services/studentSchedule.service';

type Props = {};

function Schedule({}: Props) {
    const [week, setWeek] = useState(0);
    const navigate = useNavigate();
    const params = useParams();
    const { store } = useContext(Context);

    const { loading, data, refetch, error } = useQuery<IFetchStudentSchedule>(
        GET_STUDENT_SCHEDULE,
        {
            variables: {
                id: store.user.id,
                week: week,
            },
            pollInterval: 1000 * 60 * 15,
        }
    );

    useEffect(() => {
        refetch();
        setWeek(Number.parseInt(params.week!));
    }, [week]);

    const goToPrevWeek = () => {
        setWeek(week - 1);
        navigate(`/schedule/${week - 1}`);
    };

    const goToNextWeek = () => {
        setWeek(week + 1);
        navigate(`/schedule/${week + 1}`);
    };

    return (
        <MainContentContainer header='Schedule'>
            <Container>
                <Button sx={{ margin: 1 }} variant='contained' onClick={() => goToPrevWeek()}>
                    Previous Week
                </Button>
                <Button sx={{ margin: 1 }} variant='contained' onClick={() => goToNextWeek()}>
                    Next Week
                </Button>

                <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                    {data ? (
                        groupLessonsByDayOfWeek(
                            data.studentByUser.group.schedule.lessons,
                            week
                        ).map((item) => (
                            <Grid xs={6} sx={{ maxWidth: 650 }} key={item.date.getTime()}>
                                <ScheduleTable day={item} isLoading={loading} />
                            </Grid>
                        ))
                    ) : (
                        <Loader />
                    )}
                </Grid>
            </Container>
        </MainContentContainer>
    );
}

export default Schedule;
