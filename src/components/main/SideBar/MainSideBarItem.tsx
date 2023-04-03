import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
    icon: JSX.Element;
    text: string;
    path: string;
    key: number;
};

function MainSideBarItem({ icon, text, path }: Props) {
    const navigate = useNavigate();
    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
}

export default MainSideBarItem;
