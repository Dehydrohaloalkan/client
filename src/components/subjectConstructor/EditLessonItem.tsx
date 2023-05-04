import { Delete, Save } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IRecurrence, IRecurrenceLessonInfo } from '../../core/services/adminSubjects.service';

type Props = {
    dayNumber: number;
    lessonInfo?: IRecurrenceLessonInfo;
    recurrenceObject: IRecurrence;
    setRecurrenceObject: Function;
    lessonIndex: number;
};

function EditLessonItem({
    dayNumber,
    lessonInfo,
    recurrenceObject,
    setRecurrenceObject,
    lessonIndex,
}: Props) {
    const [startTime, setStartTime] = useState(dayjs('08:00', 'HH:mm'));
    const [endTime, setEndTime] = useState(dayjs('17:00', 'HH:mm'));
    const [location, setLocation] = useState('');
    const [needToSave, setNeedToSave] = useState(false);

    useEffect(() => {
        if (lessonInfo) {
            setStartTime(dayjs(lessonInfo.startTime, 'HH:mm'));
            setEndTime(dayjs(lessonInfo.endTime, 'HH:mm'));
            setLocation(lessonInfo.location);
        }
    }, [lessonInfo]);

    const onDelete = () => {
        recurrenceObject.week!.find((item) => item.dayNumber === dayNumber)!.lessonsInfo =
            recurrenceObject
                .week!.find((item) => item.dayNumber === dayNumber)!
                .lessonsInfo.filter((item, index) => index !== lessonIndex);

        setRecurrenceObject({ ...recurrenceObject });
    };

    const onSave = () => {
        recurrenceObject.week!.find((item) => item.dayNumber === dayNumber)!.lessonsInfo[
            lessonIndex
        ] = {
            startTime: startTime.format('HH:mm'),
            endTime: endTime.format('HH:mm'),
            location: location,
        };
        setNeedToSave(false);
    };

    const onChangeStartDate = (newDate: dayjs.Dayjs | null) => {
        setStartTime(newDate ?? dayjs(new Date()));
        setNeedToSave(true);
    };

    const onChangeEndDate = (newDate: dayjs.Dayjs | null) => {
        setEndTime(newDate ?? dayjs(new Date()));
        setNeedToSave(true);
    };

    const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
        setNeedToSave(true);
    };

    return (
        <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid item xs={3}>
                <TimePicker
                    label='Start Time'
                    value={startTime}
                    onChange={onChangeStartDate}
                    ampm={false}
                />
            </Grid>
            <Grid item xs={3}>
                <TimePicker
                    label='End Time'
                    value={endTime}
                    onChange={onChangeEndDate}
                    ampm={false}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField label='Location' value={location} onChange={onChangeLocation} />
            </Grid>
            <Grid
                item
                xs={1}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <IconButton onClick={onSave}>
                    <Save color={needToSave ? 'success' : 'disabled'} />
                </IconButton>
            </Grid>
            <Grid
                item
                xs={1}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <IconButton onClick={onDelete}>
                    <Delete color='error' />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default EditLessonItem;
