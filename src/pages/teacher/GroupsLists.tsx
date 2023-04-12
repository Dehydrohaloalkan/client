import { Container, FormControl, InputLabel, ListSubheader, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import GroupTable from '../../components/group/GroupTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { getGroup, getGroups, reduceGroupsByForm } from '../../core/services/Group';
import { GroupInfoType, StudentType } from '../../core/types/Group';

type Props = {};

function GroupsLists({}: Props) {
    const [students, setStudents] = useState<StudentType[]>([]);
    const [groups, setGroups] = useState<GroupInfoType[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number>(-1);

    const [fetchGroup, isLoading, error] = useFetching(async () => {
        if (selectedGroupId != undefined)
            setStudents(Array.from((await getGroup(selectedGroupId)).students));
    });

    const [fetchGroups, isLoadingGroups, errorGroups] = useFetching(async () => {
        setGroups(Array.from(await getGroups()));
    });

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        if (selectedGroupId != -1) fetchGroup(selectedGroupId);
    }, [selectedGroupId]);

    return (
        <MainContentContainer header='Groups Lists'>
            <Container>
                {!isLoadingGroups && (
                    <FormControl sx={{ margin: 3, minWidth: 150 }}>
                        <InputLabel htmlFor='grouped-select'>Group</InputLabel>
                        <Select
                            value={selectedGroupId}
                            id='group-select'
                            label='Group'
                            onChange={(event) => {
                                setSelectedGroupId(parseInt(event.target.value as string, 10));
                            }}
                        >
                            <MenuItem value={-1}>
                                <em>None</em>
                            </MenuItem>
                            {Object.entries(reduceGroupsByForm(groups)).map((item) => [
                                <ListSubheader key={Number.parseInt(item[0])}>
                                    Form {item[0]}
                                </ListSubheader>,
                                item[1].map((group) => (
                                    <MenuItem value={group.id} key={group.id}>
                                        {group.number}
                                    </MenuItem>
                                )),
                            ])}
                        </Select>
                    </FormControl>
                )}

                {selectedGroupId != -1 && <GroupTable students={students} isLoading={isLoading} />}
            </Container>
        </MainContentContainer>
    );
}

export default GroupsLists;
