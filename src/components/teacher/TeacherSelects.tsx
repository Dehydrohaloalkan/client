import { useLazyQuery } from '@apollo/client';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useContext, useEffect } from 'react';
import {
    GET_SUBJECT_GROUPS,
    GET_TEACHER_SUBJECTS,
    IFetchSubjectGroups,
    IFetchTeacherSubjects,
} from '../../core/services/teacherSubjectsAndGroups.service';
import { Context } from '../GlobalContext';

type Props = {
    selectedSubjectId: number;
    selectedGroupId: number;
    setSelectedSubjectId: (id: number) => void;
    setSelectedGroupId: (id: number) => void;
};

function TeacherSelects({
    selectedSubjectId,
    selectedGroupId,
    setSelectedSubjectId,
    setSelectedGroupId,
}: Props) {
    const { store } = useContext(Context);

    const [
        getTeacherSubjects,
        { loading: subjectsLoading, data: subjectsData, error: subjectsError },
    ] = useLazyQuery<IFetchTeacherSubjects>(GET_TEACHER_SUBJECTS, {
        variables: { id: store.user.id },
    });

    const [getSubjectGroups, { loading: groupsLoading, data: groupsData, error: groupsError }] =
        useLazyQuery<IFetchSubjectGroups>(GET_SUBJECT_GROUPS, {
            variables: { subjectId: selectedSubjectId },
        });

    useEffect(() => {
        getTeacherSubjects();
    }, [selectedSubjectId]);

    useEffect(() => {
        getSubjectGroups();
    }, []);

    return (
        <Box sx={{ display: 'flex', gap: 2, padding: 3 }}>
            {!subjectsLoading && (
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id='subject-label'>Subject</InputLabel>
                    <Select
                        labelId='subject-label'
                        id='subject-select'
                        label='Subject'
                        value={selectedSubjectId}
                        onChange={(e) => setSelectedSubjectId(e.target.value as number)}
                    >
                        <MenuItem value={-1}>None</MenuItem>
                        {subjectsData?.user.subjects.map((subject) => (
                            <MenuItem
                                value={subject.id}
                                key={subject.id}
                            >{`${subject.course.name}. ${subject.type.name}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
            {groupsData && (
                <FormControl sx={{ width: 200 }}>
                    <InputLabel id='group-label'>Group</InputLabel>
                    <Select
                        labelId='group-label'
                        id='group-select'
                        label='Group'
                        value={selectedGroupId}
                        onChange={(e) => setSelectedGroupId(e.target.value as number)}
                    >
                        <MenuItem value={-1}>None</MenuItem>
                        {groupsData?.subject.groups.map((group) => (
                            <MenuItem value={group.id} key={group.id}>
                                {group.number}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Box>
    );
}

export default TeacherSelects;
