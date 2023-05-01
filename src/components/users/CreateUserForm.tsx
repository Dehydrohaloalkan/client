import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { IUser } from '../../core/services/adminUsers.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
};

function CreateUserForm({ open, onClose, onConfirm }: Props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setName('');
        setSurname('');
        setPatronymic('');
        setEmail('');
    }, [open]);

    const onSave = async () => {
        const newUser: Omit<IUser, 'id'> = {
            name: name,
            surname: surname,
            patronymic: patronymic,
            email: email,
        };
        await onConfirm?.(newUser);
    };

    return (
        <MainModalInput open={open} onClose={onClose} onConfirm={onSave} title={'Create User'}>
            <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant='outlined'
            />
            <TextField
                label='Surname'
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                variant='outlined'
            />
            <TextField
                label='Patronymic'
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
                variant='outlined'
            />
            <TextField
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='outlined'
            />
        </MainModalInput>
    );
}

export default CreateUserForm;
