import { useEffect, useState } from 'react';
import GroupTableWithEdit from '../components/GroupWithEdit/GroupTableWithEdit';
import MainContentContainer from '../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../core/hooks/useFetching';
import { getGroup } from '../core/services/Group';
import { PersonType } from '../core/types/Group';

type Props = {};

function StudentEditGroup({}: Props) {
    const [group, setGroup] = useState<PersonType[]>([]);

    const [fetchGroup, isLoading, error] = useFetching(async () => {
        const group = await getGroup();
        setGroup(Array.from(group));
    });

    useEffect(() => {
        fetchGroup();
    }, []);

    const onEdit = () => {
        fetchGroup();
        console.log(group);
    };

    return (
        <MainContentContainer header='Group'>
            <GroupTableWithEdit
                persons={group}
                editCallback={onEdit}
                isLoading={isLoading}
            />
        </MainContentContainer>
    );
}

export default StudentEditGroup;
