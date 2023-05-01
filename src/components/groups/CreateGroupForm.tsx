import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { IGroup } from '../../core/services/adminGroups.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
};

function CreateGroupForm({ open, onClose, onConfirm }: Props) {
    const [number, setNumber] = useState('');
    const [form, setForm] = useState(1);

    useEffect(() => {
        setNumber('');
        setForm(1);
    }, [open]);

    const onConfirmCreate = async () => {
        const newUser: Omit<IGroup, 'id'> = {
            number: number,
            form: form,
        };
        await onConfirm?.(newUser);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmCreate}
            title={'Create Group'}
        >
            <TextField
                label='Number'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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

export default CreateGroupForm;
