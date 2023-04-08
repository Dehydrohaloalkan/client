import {
    Box,
    Button,
    Modal,
    Paper,
    TextField,
    Typography,
    styled,
} from '@mui/material';

const CenteredPaper = styled(Paper)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    '> *': {
        alignSelf: 'stretch',
    },
});

const ButtonBox = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    gap: 15,
});

type Props = {
    open: boolean;
    onClose: Function;
    title: string;
};

function StudentInputForm({ open, onClose, title }: Props) {
    return (
        <Modal open={open} onClose={() => onClose()}>
            <CenteredPaper elevation={3} sx={{}}>
                <Typography textAlign='center' variant='h5'>
                    {title}
                </Typography>

                <TextField label='Standard' variant='standard' />

                <ButtonBox>
                    <Button variant='outlined' onClick={() => onClose()}>
                        Cancel
                    </Button>
                    <Button variant='contained'>Save</Button>
                </ButtonBox>
            </CenteredPaper>
        </Modal>
    );
}

export default StudentInputForm;
