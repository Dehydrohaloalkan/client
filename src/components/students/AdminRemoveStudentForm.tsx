import { Typography } from '@mui/material';
import { IStudent } from '../../core/services/studentGroup.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    student?: IStudent;
};

function AdminRemoveStudentForm({ open, onClose, onConfirm, student }: Props) {
    const onConfirmRemove = () => {
        onConfirm?.(student?.studentId);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmRemove}
            title={'Remove Student'}
            confirmButtonText='Yes'
        >
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <em>
                    Do you wont to remove {student?.name} {student?.surname}?
                </em>
            </Typography>
        </MainModalInput>
    );
}

export default AdminRemoveStudentForm;
