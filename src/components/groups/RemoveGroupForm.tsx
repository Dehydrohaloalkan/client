import { Typography } from '@mui/material';
import { IGroup } from '../../core/services/adminGroups.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    group?: IGroup;
};

function RemoveGroupForm({ open, onClose, onConfirm, group }: Props) {
    const onConfirmRemove = () => {
        onConfirm?.(group?.id);
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
                <em>Do you wont to remove group {group?.number}?</em>
            </Typography>
        </MainModalInput>
    );
}

export default RemoveGroupForm;
