import { useLazyQuery } from '@apollo/client';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Role } from '../../core/models/auth/Role';
import { GET_ALL_GROUPS, IFetchAllGroups } from '../../core/services/adminStudents.service';
import { IStudent } from '../../core/services/studentGroup.service';
import MainModalInput from '../main/MainModalInput/MainModalInput';

type Props = {
    open: boolean;
    onClose?: Function;
    onConfirm?: Function;
};

function AdminCreateStudentForm({ open, onClose, onConfirm }: Props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<string>(Role.student);
    const [subGroup, setSubGroup] = useState<number>(1);
    const [groupId, setGroupId] = useState<number>(-1);

    const [getAllGroups, { data: groupsData, loading }] =
        useLazyQuery<IFetchAllGroups>(GET_ALL_GROUPS);

    useEffect(() => {
        getAllGroups();
    }, []);

    const onSave = async () => {
        const newStudent: Omit<IStudent, 'studentId'> = {
            name: name,
            surname: surname,
            patronymic: patronymic,
            email: email,
            isMarking: role == Role.marking,
            isLeader: role == Role.leader,
            subgroup: subGroup == 2,
            groupId: groupId,
        };
        await onConfirm?.(newStudent);
    };

    return (
        <MainModalInput open={open} onClose={onClose} onConfirm={onSave} title={'Edit Student'}>
            <TextField
                label='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant='outlined'
            />
            <TextField
                label='Surname'
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                variant='outlined'
            />
            <TextField
                label='Patronymic'
                value={patronymic}
                onChange={(e) => setPatronymic(e.target.value)}
                variant='outlined'
            />
            <TextField
                label='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant='outlined'
            />
            <FormControl fullWidth>
                <InputLabel id='role-label'>Role</InputLabel>
                <Select
                    labelId='role-label'
                    id='role-select'
                    label='Role'
                    value={role}
                    onChange={(e) => {
                        setRole(e.target.value);
                    }}
                >
                    <MenuItem value={Role.leader}>Leader</MenuItem>
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
                    onChange={(e) => setSubGroup(e.target.value as number)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id='group-label'>Group</InputLabel>
                <Select
                    labelId='group-label'
                    id='group-select'
                    label='Group'
                    value={groupId}
                    onChange={(e) => setGroupId(e.target.value as number)}
                >
                    <MenuItem key={-1} value={-1}>
                        <em>None</em>
                    </MenuItem>
                    {groupsData?.groups.map((g) => (
                        <MenuItem key={g.id} value={g.id}>
                            {g.number}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </MainModalInput>
    );
}

export default AdminCreateStudentForm;
