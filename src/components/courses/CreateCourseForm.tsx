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
};

export const formatDate = (date: Date | string) => {
    const isoString = new Date(date).toISOString();
    return isoString.substring(0, 10);
};

function CreateCourseForm({ open, onClose, onConfirm }: Props) {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [form, setForm] = useState(1);

    useEffect(() => {
        setName('');
        setStartDate(dayjs(new Date()));
        setEndDate(dayjs(new Date()));
        setForm(1);
    }, [open]);

    const onConfirmCreate = async () => {
        const newCourse: Omit<ICourse, 'id'> = {
            name: name,
            startDate: new Date(startDate.toDate()),
            endDate: new Date(endDate.toDate()),
            form: form,
        };
        await onConfirm?.(newCourse);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmCreate}
            title={'Create Course'}
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
                value={dayjs(startDate)}
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

export default CreateCourseForm;
