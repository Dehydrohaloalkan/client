import { Button, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../components/GlobalContext';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import ScheduleTable from '../../components/schedule/ScheduleTable';

type Props = {};

function Schedule({}: Props) {
    const [schedule, setSchedule] = useState<ScheduleType[]>([]);
    const [week, setWeek] = useState(0);
    const navigate = useNavigate();
    const params = useParams();
    const { store } = useContext(Context);

    // const [fetchSchedule, isLoading, error] = useFetching(async () => {
    //     const schedule = await getSchedule(week);
    //     setSchedule(schedule);
    // });

    // useEffect(() => {
    //     fetchSchedule();
    //     setWeek(Number.parseInt(params.week!));
    // }, [week]);

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
                    {schedule.map((item, index) => (
                        <Grid xs={6} sx={{ maxWidth: 650 }} key={index}>
                            <ScheduleTable
                                day={item}
                                // todo
                                isLoading={false}
                                isFor='Teacher'
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </MainContentContainer>
    );
}

export default Schedule;
