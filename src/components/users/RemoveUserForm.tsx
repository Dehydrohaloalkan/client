import { Typography } from '@mui/material';
import { IUser } from '../../core/services/adminUsers.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    user?: IUser;
};

function RemoveUserForm({ open, onClose, onConfirm, user }: Props) {
    const onConfirmRemove = () => {
        onConfirm?.(user?.id);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmRemove}
            title={'Remove User'}
            confirmButtonText='Yes'
        >
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <em>
                    Do you wont to remove {user?.name} {user?.surname}?
                </em>
            </Typography>
        </MainModalInput>
    );
}

export default RemoveUserForm;
