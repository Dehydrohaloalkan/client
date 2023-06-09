import { useEffect, useState } from 'react';
import GroupTable from '../../components/group/GroupTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { IGroup } from '../../core/models';
import { GroupService } from '../../core/services';

type Props = {};

function Group({}: Props) {
    const [group, setGroup] = useState<IGroup>();

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
            <GroupTable
                group={group}
                //students={students}
                //editCallback={onEdit}
                isLoading={isLoading}
                //isFor='Student'
            />
        </MainContentContainer>
    );
}

export default Group;
