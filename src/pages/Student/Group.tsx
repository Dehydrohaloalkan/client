import { useContext, useEffect } from 'react';
import GroupTable from '../../components/group/GroupTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';

import { useQuery } from '@apollo/client';
import { Context } from '../../components/GlobalContext';
import { GET_GROUP, IStudentGroup } from '../../core/services/studentGroup.service';

type Props = {};

function Group({}: Props) {
    const { store } = useContext(Context);

    const { loading, data, refetch, error } = useQuery<{ studentByUser: { group: IStudentGroup } }>(
        GET_GROUP,
        { variables: { id: store.user.id } }
    );

    useEffect(() => {
        console.log(data);
    }, [data]);

    // const [fetchGroup, isLoading, error] = useFetching(async () => {
    //     const group: IGroup = await GroupService.getStudentGroup();
    //     setGroup(group);
    // });

    // const onEdit = () => {
    //     fetchGroup();
    // };

    return (
        <MainContentContainer header='Group'>
            <GroupTable
                group={data?.studentByUser.group}
                //students={students}
                //editCallback={onEdit}
                isLoading={loading}
                //isFor='Student'
            />
        </MainContentContainer>
    );
}

export default Group;
