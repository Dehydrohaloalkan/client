import { Button } from '@mui/material';
import { useState } from 'react';
import GroupTable from '../../components/group/GroupTable';
import StudentEditForm from '../../components/group/StudentEditForm';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';

type Props = {};

function Students({}: Props) {
    const [students, setStudents] = useState<StudentType[]>([]);
    const [groups, setGroups] = useState<GroupInfoType[]>([]);
    //const { user } = useContext(Context);

    const [open, setOpen] = useState<boolean>(false);

    // const [fetchData, isLoading, error] = useFetching(async () => {
    //     //setStudents(Array.from(await getAllStudents()));
    //     //setGroups(Array.from(await getGroups()));
    // });

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const onEdit = () => {
    //     fetchData();
    // };

    return (
        <MainContentContainer header='Group'>
            <>
                <Button onClick={() => setOpen(true)}>modal</Button>
                <GroupTable
                //students={students}
                //groups={groups}
                //editCallback={onEdit}
                //isLoading={isLoading}
                //isFor='Admin'
                />
                <StudentEditForm title={'Edit'} open={open} onClose={() => setOpen(false)} />
            </>
        </MainContentContainer>
    );
}

export default Students;
