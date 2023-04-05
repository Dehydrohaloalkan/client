import { useContext, useEffect, useState } from 'react';
import { Context } from '../../components/GlobalContext';
import GroupTableWithEdit from '../../components/groupWithEdit/GroupTableWithEdit';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { getGroup } from '../../core/services/Group';
import { StudentType } from '../../core/types/Group';

type Props = {};

function GroupWithEdit({}: Props) {
    const [students, setStudents] = useState<StudentType[]>([]);
    const { user } = useContext(Context);

    const [fetchGroup, isLoading, error] = useFetching(async () => {
        const data = await getGroup(user!.student!.groupId);
        setStudents(Array.from(data.students));
    });

    useEffect(() => {
        fetchGroup();
    }, []);

    const onEdit = () => {
        fetchGroup();
    };

    return (
        <MainContentContainer header='Group'>
            <GroupTableWithEdit
                students={students}
                editCallback={onEdit}
                isLoading={isLoading}
            />
        </MainContentContainer>
    );
}

export default GroupWithEdit;
