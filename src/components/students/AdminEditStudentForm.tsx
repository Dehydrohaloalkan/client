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
    student?: IStudent;
};

function AdminEditStudentForm({ open, onClose, onConfirm, student }: Props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<string>();
    const [subGroup, setSubGroup] = useState<number>();
    const [groupId, setGroupId] = useState<number>();

    const [getAllGroups, { data: groupsData, loading }] =
        useLazyQuery<IFetchAllGroups>(GET_ALL_GROUPS);

    useEffect(() => {
        setName(student?.name || '');
        setSurname(student?.surname || '');
        setPatronymic(student?.patronymic || '');
        setEmail(student?.email || '');
        setRole(student?.isLeader ? Role.leader : student?.isMarking ? Role.marking : Role.student);
        setSubGroup(student?.subgroup ? 2 : 1);
        setGroupId(student?.groupId);
    }, [student]);

    useEffect(() => {
        getAllGroups();
    }, []);

    const onConfirmEdit = async () => {
        const newStudent = { ...student };
        newStudent.name = name;
        newStudent.surname = surname;
        newStudent.patronymic = patronymic;
        newStudent.email = email;
        newStudent.isMarking = role == Role.marking;
        newStudent.isLeader = role == Role.leader;
        newStudent.subgroup = subGroup == 2;
        newStudent.groupId = groupId;
        await onConfirm?.(newStudent);
    };

    return (
        <MainModalInput
            open={open}
            onClose={onClose}
            onConfirm={onConfirmEdit}
            title={'Edit Student'}
        >
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
            {groupId && (
                <FormControl fullWidth>
                    <InputLabel id='group-label'>Group</InputLabel>
                    <Select
                        labelId='group-label'
                        id='group-select'
                        label='Group'
                        value={groupId}
                        onChange={(e) => setGroupId(e.target.value as number)}
                    >
                        {groupsData?.groups.map((g) => (
                            <MenuItem key={g.id} value={g.id}>
                                {g.number}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </MainModalInput>
    );
}

export default AdminEditStudentForm;
