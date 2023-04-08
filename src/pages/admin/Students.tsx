import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../components/GlobalContext';
import GroupTableWithEdit from '../../components/groupWithEdit/GroupTableWithEdit';
import StudentInputForm from '../../components/groupWithEdit/StudentInputForm';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { getAllStudents, getGroups } from '../../core/services/Group';
import { GroupInfoType, StudentType } from '../../core/types/Group';

type Props = {};

function Students({}: Props) {
    const [students, setStudents] = useState<StudentType[]>([]);
    const [groups, setGroups] = useState<GroupInfoType[]>([]);
    const { user } = useContext(Context);

    const [open, setOpen] = useState<boolean>(false);

    const [fetchData, isLoading, error] = useFetching(async () => {
        setStudents(Array.from(await getAllStudents()));
        setGroups(Array.from(await getGroups()));
    });

    useEffect(() => {
        fetchData();
    }, []);

    const onEdit = () => {
        fetchData();
    };

    return (
        <MainContentContainer header='Group'>
            <>
                <Button onClick={() => setOpen(true)}>modal</Button>
                <GroupTableWithEdit
                    students={students}
                    groups={groups}
                    editCallback={onEdit}
                    isLoading={isLoading}
                    isFor='Admin'
                />
                <StudentInputForm
                    title={'Edit'}
                    open={open}
                    onClose={() => setOpen(false)}
                />
            </>
        </MainContentContainer>
    );
}

export default Students;
