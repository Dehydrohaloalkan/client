import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ICourse } from '../../core/services/adminCourses.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';
import { formatDate } from './CreateCourseForm';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    course?: ICourse;
};

function EditCourseForm({ open, onClose, onConfirm, course }: Props) {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));
    const [form, setForm] = useState(1);

    useEffect(() => {
        setName(course?.name || '');
        setStartDate(formatDate(course?.startDate ?? new Date()));
        setEndDate(formatDate(course?.endDate ?? new Date()));
        setForm(course?.form || 1);
    }, [course]);

    const onConfirmEdit = async () => {
        const newCourse = { ...course };
        newCourse.name = name;
        newCourse.startDate = new Date(startDate);
        newCourse.endDate = new Date(endDate);
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
            <TextField
                label='Start Date'
                value={startDate}
                type='date'
                onChange={(e) => setStartDate(formatDate(e.target.value))}
                variant='outlined'
            />
            <TextField
                label='End Date'
                value={endDate}
                type='date'
                onChange={(e) => setEndDate(formatDate(e.target.value))}
                variant='outlined'
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
