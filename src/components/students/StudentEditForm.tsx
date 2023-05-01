import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Role } from '../../core/models/auth/Role';
import { IStudent } from '../../core/services/studentGroup.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
    student?: IStudent;
};

function StudentEditForm({ open, onClose, onConfirm, student }: Props) {
    const [role, setRole] = useState<string>();
    const [subGroup, setSubGroup] = useState<number>();

    useEffect(() => {
        setRole(student?.isLeader ? Role.leader : student?.isMarking ? Role.marking : Role.student);
        setSubGroup(student?.subgroup ? 2 : 1);
    }, [student]);

    const onSave = () => {
        const newStudent = { ...student };
        if (newStudent) {
            newStudent.isMarking = role == Role.marking;
            newStudent.subgroup = subGroup == 2;
        }
        onConfirm?.(newStudent);
    };

    return (
        <MainModalInput open={open} onClose={onClose} onConfirm={onSave} title={'Edit Student'}>
            <Typography textAlign='center' variant='h6'>
                {`${student?.name} ${student?.surname}`}
            </Typography>
            <FormControl fullWidth>
                <InputLabel id='role-label'>Role</InputLabel>
                <Select
                    disabled={role === Role.leader}
                    labelId='role-label'
                    id='role-select'
                    label='Role'
                    value={role}
                    defaultValue={role}
                    onChange={(e) => {
                        setRole(e.target.value);
                    }}
                >
                    {role === Role.leader && <MenuItem value={Role.leader}>Leader</MenuItem>}
                    <MenuItem value={Role.student}>None</MenuItem>
                    <MenuItem value={Role.marking}>Marking</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id='subgroup-label'>Subgroup</InputLabel>
                <Select
                    labelId='subgroup-label'
                    id='subgroup-select'
                    label='Subgroup'
                    value={subGroup}
                    defaultValue={subGroup}
                    onChange={(e) => setSubGroup(e.target.value as number)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                </Select>
            </FormControl>
        </MainModalInput>
    );
}

export default StudentEditForm;
