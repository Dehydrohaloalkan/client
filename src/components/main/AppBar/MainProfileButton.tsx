import { Avatar, Button, Typography } from '@mui/material';
import { useContext } from 'react';
import { Context } from '../../GlobalContext';

type Props = {
    setOpen: (open: boolean) => void;
};

function MainProfileButton({ setOpen }: Props) {
    const { store } = useContext(Context);

    function getBackgroundColor(name: string): string {
        const colors = [
            '#FFB6C1', // LightPink
            '#FFC0CB', // Pink
            '#FF69B4', // HotPink
            '#FF1493', // DeepPink
            '#C71585', // MediumVioletRed
            '#DB7093', // PaleVioletRed
            '#FFA07A', // LightSalmon
            '#FA8072', // Salmon
            '#E9967A', // DarkSalmon
            '#F08080', // LightCoral
            '#CD5C5C', // IndianRed
            '#DC143C', // Crimson
            '#B22222', // FireBrick
            '#8B0000', // DarkRed
        ];

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        const index = Math.abs(hash) % colors.length;
        return colors[index];
    }

    return (
        <Typography
            component={Button}
            color={'white'}
            onClick={() => setOpen(true)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Typography variant='body1' p={1}>
                {`${store.user.name} ${store.user.surname}`}
            </Typography>
            <Avatar
                sx={{
                    bgcolor: getBackgroundColor(store.user.surname),
                }}
                children={`${store.user.name[0]}${store.user.surname[0]}`}
            />
        </Typography>
    );
}

export default MainProfileButton;
