import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IRoute } from '../../../core/models/route/IRoute';

type Props = {
    item: IRoute;
};

function MainButtonListItem({ item }: Props) {
    const navigate = useNavigate();

    return (
        <Card sx={{ minWidth: 300 }}>
            <CardActionArea onClick={() => navigate(item.path)}>
                {item.picture && (
                    <CardMedia
                        component='img'
                        height='150'
                        image={item.picture.src}
                        alt={item.picture.alt}
                    />
                )}

                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {item.name}
                    </Typography>
                    {item.description && (
                        <Typography variant='body2' color='text.secondary'>
                            {item.description}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default MainButtonListItem;
