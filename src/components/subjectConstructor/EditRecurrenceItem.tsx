import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { IRecurrence } from '../../core/services/adminSubjects.service';
import EditLessonItem from './EditLessonItem';

type Props = {
    recurrenceObject: IRecurrence;
    setRecurrenceObject: Function;
};

function EditRecurrenceItem({ recurrenceObject, setRecurrenceObject }: Props) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const addNewLesson = (dayNumber: number) => {
        if (!recurrenceObject.week?.find((item) => item.dayNumber === dayNumber)) {
            recurrenceObject.week?.push({
                dayNumber,
                lessonsInfo: [],
            });
        }

        recurrenceObject.week
            ?.find((item) => item.dayNumber === dayNumber)
            ?.lessonsInfo.push({
                startTime: '8:00',
                endTime: '9:00',
                location: '',
            });
        setRecurrenceObject({ ...recurrenceObject });
    };

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            {daysOfWeek.map((day, dayIndex) => (
                <Grid item xs={12} md={12} lg={6} key={dayIndex}>
                    <Card elevation={2} sx={{ backgroundColor: '#dbf0ea' }}>
                        <CardContent>
                            <Typography variant='h6' component='div' sx={{ mb: 2 }}>
                                {day}
                            </Typography>
                            {recurrenceObject?.week
                                ?.find((day) => day.dayNumber === dayIndex + 1)
                                ?.lessonsInfo.map((info, lessonIndex) => (
                                    <EditLessonItem
                                        recurrenceObject={recurrenceObject}
                                        setRecurrenceObject={setRecurrenceObject}
                                        key={lessonIndex}
                                        lessonIndex={lessonIndex}
                                        dayNumber={dayIndex + 1}
                                        lessonInfo={info}
                                    />
                                ))}
                            <Button onClick={() => addNewLesson(dayIndex + 1)}>
                                Create new Lesson
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default EditRecurrenceItem;
