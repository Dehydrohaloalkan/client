import ClassIcon from '@mui/icons-material/Class';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {};

function MainLogo({}: Props) {
    const navigate = useNavigate();

    return (
        <Typography component={Button} variant='h5' color={'white'} onClick={() => navigate('/')}>
            <ClassIcon />
            <Typography variant='h5' p={1}>
                Class Journal
            </Typography>
        </Typography>
    );
}

export default MainLogo;
