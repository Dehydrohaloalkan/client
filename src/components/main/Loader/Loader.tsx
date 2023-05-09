import { Box, CircularProgress } from '@mui/material';

type Props = {};

function Loader({}: Props) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
            }}
        >
            <CircularProgress color='secondary' />
        </Box>
    );
}

export default Loader;
