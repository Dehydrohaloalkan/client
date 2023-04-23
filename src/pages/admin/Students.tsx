import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import GroupTable from '../../components/group/GroupTable';
import StudentInputForm from '../../components/group/StudentInputForm';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { GroupInfoType, StudentType } from '../../core/types/Group';

type Props = {};

function Students({}: Props) {
    const [students, setStudents] = useState<StudentType[]>([]);
    const [groups, setGroups] = useState<GroupInfoType[]>([]);
    //const { user } = useContext(Context);

    const [open, setOpen] = useState<boolean>(false);

    const [fetchData, isLoading, error] = useFetching(async () => {
        //setStudents(Array.from(await getAllStudents()));
        //setGroups(Array.from(await getGroups()));
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
                <GroupTable
                    students={students}
                    groups={groups}
                    editCallback={onEdit}
                    isLoading={isLoading}
                    isFor='Admin'
                />
                <StudentInputForm title={'Edit'} open={open} onClose={() => setOpen(false)} />
            </>
        </MainContentContainer>
    );
}

export default Students;
