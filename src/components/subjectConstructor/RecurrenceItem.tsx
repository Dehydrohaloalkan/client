import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { IRecurrence } from '../../core/services/adminSubjects.service';

type Props = {
    recurrence: string;
};

export function formatRecurrence(recurrence: string): IRecurrence {
    return JSON.parse(recurrence);
}

function RecurrenceItem({ recurrence }: Props) {
    const [recurrenceObject, setRecurrenceObject] = useState<IRecurrence>(
        formatRecurrence(recurrence)
    );

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <Grid container spacing={2}>
            {recurrenceObject?.week?.map((day, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card elevation={2} sx={{ backgroundColor: '#dbf0ea' }}>
                        <CardContent>
                            <Typography variant='h6' component='div'>
                                {daysOfWeek[day.dayNumber - 1]}
                            </Typography>
                            {day.lessonsInfo.map((info, index) => (
                                <Typography key={index}>
                                    {info.startTime} - {info.endTime} in {info.location}
                                </Typography>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default RecurrenceItem;
