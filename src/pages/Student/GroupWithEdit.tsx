import { useContext, useEffect, useState } from 'react';
import { Context } from '../../components/GlobalContext';
import GroupTableWithEdit from '../../components/groupWithEdit/GroupTableWithEdit';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { IGroup } from '../../core/models';
import GroupService from '../../core/services/group.service';

type Props = {};

function GroupWithEdit({}: Props) {
    const [group, setGroup] = useState<IGroup>();
    const { store } = useContext(Context);

    const [fetchGroup, isLoading, error] = useFetching(async () => {
        const group: IGroup = await GroupService.getStudentGroup();
        setGroup(group);
    });

    useEffect(() => {
        fetchGroup();
    }, []);

    // const onEdit = () => {
    //     fetchGroup();
    // };

    return (
        <MainContentContainer header='Group'>
            <GroupTableWithEdit
                group={group}
                //students={students}
                //editCallback={onEdit}
                isLoading={isLoading}
                //isFor='Student'
            />
        </MainContentContainer>
    );
}

export default GroupWithEdit;
