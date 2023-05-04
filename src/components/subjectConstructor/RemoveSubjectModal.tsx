import { Typography } from '@mui/material';
import { ISubject } from '../../core/services/adminSubjects.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    subject?: ISubject;
};

function RemoveSubjectModal({ open, onClose, onConfirm, subject }: Props) {
    const onConfirmRemove = async () => {
        await onConfirm?.(subject?.id);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmRemove}
            title={'Remove Subject'}
            confirmButtonText='Yes'
        >
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <em>
                    Do you wont to remove {subject?.course.name}. {subject?.type.name}?
                </em>
            </Typography>
        </MainModalInput>
    );
}

export default RemoveSubjectModal;
