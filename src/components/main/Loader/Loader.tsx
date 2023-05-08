import { Box, Skeleton } from '@mui/material';

type Props = {};

function Loader({}: Props) {
    return (
        <Box>
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            <Skeleton variant='rounded' width={600} height={100} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        </Box>
    );
}

export default Loader;
