import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ICourse } from '../../core/services/adminCourses.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    course?: ICourse;
};

function EditCourseForm({ open, onClose, onConfirm, course }: Props) {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [form, setForm] = useState(1);

    useEffect(() => {
        setName(course?.name || '');
        setStartDate(dayjs(course?.startDate ?? new Date()));
        setEndDate(dayjs(course?.endDate ?? new Date()));
        setForm(course?.form || 1);
    }, [course]);

    const onConfirmEdit = async () => {
        const newCourse = { ...course };
        newCourse.name = name;
        newCourse.startDate = new Date(startDate.toDate());
        newCourse.endDate = new Date(endDate.toDate());
        newCourse.form = form;
        await onConfirm?.(newCourse);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmEdit}
            title={'Edit Course'}
        >
            <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant='outlined'
            />
            <DatePicker
                label='Start Date'
                format='DD.MM.YYYY'
                value={startDate}
                onChange={(newDate) => setStartDate(newDate ?? dayjs(new Date()))}
            />
            <DatePicker
                label='End Date'
                format='DD.MM.YYYY'
                value={endDate}
                onChange={(newDate) => setEndDate(newDate ?? dayjs(new Date()))}
            />
            <TextField
                label='Form'
                value={form}
                type='number'
                onChange={(e) => setForm(parseInt(e.target.value))}
                variant='outlined'
            />
        </MainModalInput>
    );
}

export default EditCourseForm;
