import { Typography } from '@mui/material';
import { ICourse } from '../../core/services/adminCourses.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    course?: ICourse;
};

function RemoveCourseForm({ open, onClose, onConfirm, course }: Props) {
    const onConfirmRemove = () => {
        onConfirm?.(course?.id);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmRemove}
            title={'Remove Course'}
            confirmButtonText='Yes'
        >
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                <em>Do you wont to remove course {course?.name}?</em>
            </Typography>
        </MainModalInput>
    );
}

export default RemoveCourseForm;
