import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { IUser } from '../../core/services/adminUsers.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    user?: IUser;
};

function EditUserForm({ open, onClose, onConfirm, user }: Props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setName(user?.name || '');
        setSurname(user?.surname || '');
        setPatronymic(user?.patronymic || '');
        setEmail(user?.email || '');
    }, [user]);

    const onConfirmEdit = async () => {
        const newUser = { ...user };
        newUser.name = name;
        newUser.surname = surname;
        newUser.patronymic = patronymic;
        newUser.email = email;
        await onConfirm?.(newUser);
    };

    return (
        <MainModalInput open={open} onClose={onClose} onConfirm={onConfirmEdit} title={'Edit User'}>
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

export default EditUserForm;
