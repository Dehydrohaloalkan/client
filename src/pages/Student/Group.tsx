import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { Context } from '../../components/GlobalContext';
import GroupTable from '../../components/group/GroupTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import {
    GET_GROUP_WITH_STUDENTS,
    IFetchStudentGroup,
} from '../../core/services/studentGroup.service';

type Props = {};

function Group({}: Props) {
    const { store } = useContext(Context);

    const { loading, data, refetch, error } = useQuery<IFetchStudentGroup>(
        GET_GROUP_WITH_STUDENTS,
        {
            variables: { id: store.user.id },
            pollInterval: 1000 * 60 * 15,
        }
    );

    return (
        <MainContentContainer header='Group'>
            <GroupTable
                group={data?.studentByUser.group}
                //editCallback={onEdit}
                isLoading={loading}
                //isFor='Student'
            />
        </MainContentContainer>
    );
}

export default Group;
