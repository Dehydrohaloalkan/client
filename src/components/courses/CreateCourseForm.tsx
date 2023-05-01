import { TextField } from '@mui/material';
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
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));
    const [form, setForm] = useState(1);

    useEffect(() => {
        setName('');
        setStartDate(formatDate(new Date()));
        setEndDate(formatDate(new Date()));
        setForm(1);
    }, [open]);

    const onConfirmCreate = async () => {
        const newCourse: Omit<ICourse, 'id'> = {
            name: name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
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

export default CreateCourseForm;
