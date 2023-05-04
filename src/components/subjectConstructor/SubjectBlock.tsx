import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { ISubject } from '../../core/services/adminSubjects.service';
import RecurrenceItem from './RecurrenceItem';

type Props = {
    subject: ISubject;
    onEdit?: Function;
    onRemove?: Function;
};

function SubjectBlock({ subject, onEdit, onRemove }: Props) {
    return (
        <Card sx={{ m: 2 }} elevation={2}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                        <Typography variant='h5' component='div'>
                            {subject.course.name}. {subject.type.name}
                        </Typography>
                        <Typography color='text.secondary'>
                            Teacher: {subject.teacher.name} {subject.teacher.surname}
                        </Typography>
                    </Box>
                    <Box>
                        {subject.groups.map((group) => (
                            <Chip
                                color='info'
                                variant='outlined'
                                clickable
                                sx={{ ml: 1 }}
                                label={group.number}
                                key={group.id}
                            />
                        ))}
                    </Box>
                </Box>
                {subject.recurrence && <RecurrenceItem recurrence={subject.recurrence} />}
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size='small' startIcon={<Edit />} color='info' onClick={() => onEdit?.()}>
                    Edit
                </Button>
                <Button
                    size='small'
                    startIcon={<Delete />}
                    color='error'
                    onClick={() => onRemove?.()}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
}

export default SubjectBlock;
