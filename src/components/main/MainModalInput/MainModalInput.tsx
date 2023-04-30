import { Box, Button, Modal, Paper, Typography, styled } from '@mui/material';

type Props = {
    open: boolean;
    title: string;
    onClose?: Function;
    onConfirm?: Function;
    confirmButtonText?: string;
    children: React.ReactNode;
};

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

function MainModalInput({ open, onClose, onConfirm, title, children, confirmButtonText }: Props) {
    return (
        <Modal open={open} onClose={() => onClose?.()}>
            <CenteredPaper elevation={3} sx={{}}>
                <Typography textAlign='center' variant='h5'>
                    {title}
                </Typography>
                {children}
                <ButtonBox>
                    <Button variant='outlined' color='warning' onClick={() => onClose?.()}>
                        Cancel
                    </Button>
                    <Button variant='contained' color='success' onClick={() => onConfirm?.()}>
                        {confirmButtonText ?? 'Save'}
                    </Button>
                </ButtonBox>
            </CenteredPaper>
        </Modal>
    );
}

export default MainModalInput;
