import { Button, Paper, TextField, Typography, styled } from '@mui/material';
import { useContext, useState } from 'react';
import { Context } from '../../components/GlobalContext';
import { login as loginFn } from '../../core/services/Auth';

type Props = {};

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

function LoginPage({}: Props) {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { user, setUser } = useContext(Context);

    return (
        <CenteredPaper elevation={4}>
            <Typography textAlign='center' variant='h5'>
                Login
            </Typography>
            <TextField
                id='login'
                type='login'
                label='login'
                variant='outlined'
                value={login}
                onChange={(event) => setLogin(event.target.value)}
            />
            <TextField
                id='password'
                type='password'
                label='password'
                variant='outlined'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button
                variant='contained'
                sx={{ padding: 1 }}
                onClick={async () => {
                    const response = await loginFn({ login, password });
                    setUser?.(response!.data!.data);
                }}
            >
                login
            </Button>
        </CenteredPaper>
    );
}

export default LoginPage;
