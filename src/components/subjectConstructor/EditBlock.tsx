import { Cancel, Save } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ICourse } from '../../core/services/adminCourses.service';
import { IGroup } from '../../core/services/adminStudents.service';
import {
    ICreateUpdateSubject,
    IRecurrence,
    ISubject,
    IType,
} from '../../core/services/adminSubjects.service';
import { IUser } from '../../core/services/adminUsers.service';
import EditRecurrenceItem from './EditRecurrenceItem';
import { formatRecurrence } from './RecurrenceItem';

type Props = {
    courses: ICourse[];
    teachers: IUser[];
    groups: IGroup[];
    types: IType[];
    subject?: ISubject;
    onCancel?: Function;
    onSave?: Function;
};

function EditBlock({ courses, teachers, groups, types, subject, onCancel, onSave }: Props) {
    const [courseId, setCourseId] = useState(-1);
    const [typeId, setTypeId] = useState(-1);
    const [teacherId, setTeacherId] = useState('');
    const [groupsId, setGroupsId] = useState<number[]>([]);
    const [recurrenceObject, setRecurrenceObject] = useState<IRecurrence>(
        subject?.recurrence
            ? formatRecurrence(subject.recurrence)
            : {
                  week: [],
              }
    );

    useEffect(() => {
        if (subject) {
            setCourseId(subject.course.id);
            setTypeId(subject.type.id);
            setTeacherId(subject.teacher.id);
            setGroupsId(subject.groups.map((group) => group.id));
        }
    }, [subject]);

    const minimizeRecurrence = (recurrence: IRecurrence): IRecurrence => {
        return {
            week: recurrence.week?.filter((day) => day.lessonsInfo.length > 0),
        };
    };

    const onSaveClick = () => {
        const recurrence = minimizeRecurrence(recurrenceObject);
        const newSubject: ICreateUpdateSubject = {
            id: subject?.id,
            courseId,
            typeId,
            teacherId,
            groups: groupsId,
            recurrence: recurrence.week?.length ? JSON.stringify(recurrence) : '',
        };
        onSave?.(newSubject);
    };

    return (
        <Card sx={{ m: 2 }} elevation={2}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel id='course-label'>Course</InputLabel>
                            <Select
                                labelId='course-label'
                                id='course-select'
                                label='Course'
                                value={courseId}
                                onChange={(e) => {
                                    setCourseId(e.target.value as number);
                                }}
                            >
                                <MenuItem value={-1}>
                                    <em>None</em>
                                </MenuItem>
                                {courses.map((course) => (
                                    <MenuItem key={course.id} value={course.id}>
                                        {course.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel id='type-label'>Type</InputLabel>
                            <Select
                                labelId='type-label'
                                id='type-select'
                                label='Type'
                                value={typeId}
                                onChange={(e) => {
                                    setTypeId(e.target.value as number);
                                }}
                            >
                                <MenuItem value={-1}>
                                    <em>None</em>
                                </MenuItem>
                                {types.map((type) => (
                                    <MenuItem key={type.id} value={type.id}>
                                        {type.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel id='teacher-label'>Teacher</InputLabel>
                            <Select
                                labelId='teacher-label'
                                id='teacher-select'
                                label='Teacher'
                                value={teacherId}
                                onChange={(e) => {
                                    setTeacherId(e.target.value);
                                }}
                            >
                                {teachers.map((teacher) => (
                                    <MenuItem key={teacher.id} value={teacher.id}>
                                        {teacher.name} {teacher.surname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <FormControl fullWidth>
                            <InputLabel id='group-label'>Groups</InputLabel>
                            <Select
                                labelId='group-label'
                                id='group-select'
                                label='Groups'
                                multiple
                                value={groupsId}
                                onChange={(e) => {
                                    setGroupsId(
                                        typeof e.target.value === 'string'
                                            ? [parseInt(e.target.value)]
                                            : e.target.value
                                    );
                                }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={
                                                    groups.find((group) => group.id == value)
                                                        ?.number
                                                }
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                {groups.map((group) => (
                                    <MenuItem key={group.id} value={group.id}>
                                        {group.number}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <EditRecurrenceItem
                    recurrenceObject={recurrenceObject}
                    setRecurrenceObject={setRecurrenceObject}
                />
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    size='small'
                    startIcon={<Cancel />}
                    color='info'
                    onClick={() => {
                        onCancel?.();
                    }}
                >
                    Cancel
                </Button>
                <Button size='small' startIcon={<Save />} color='success' onClick={onSaveClick}>
                    Save
                </Button>
            </CardActions>
        </Card>
    );
}

export default EditBlock;
