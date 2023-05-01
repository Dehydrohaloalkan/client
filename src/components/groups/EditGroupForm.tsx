import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { IGroup } from '../../core/services/adminGroups.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    group?: IGroup;
};

function EditGroupForm({ open, onClose, onConfirm, group }: Props) {
    const [number, setNumber] = useState('');
    const [form, setForm] = useState(1);

    useEffect(() => {
        setNumber(group?.number || '');
        setForm(group?.form || 1);
    }, [group]);

    const onConfirmEdit = async () => {
        const newGroup = { ...group };
        newGroup.number = number;
        newGroup.form = form;
        await onConfirm?.(newGroup);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmEdit}
            title={'Edit Group'}
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

export default EditGroupForm;
