import { useMutation, useQuery } from '@apollo/client';
import {
    CREATE_GROUP,
    GET_ALL_GROUPS,
    IFetchAllGroups,
    IGroup,
    REMOVE_GROUP,
    UPDATE_GROUP,
} from '../../core/services/adminGroups.service';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import GroupsTable from '../../components/groups/GroupsTable';

type Props = {};

function Groups({}: Props) {
    const {
        data: groupsData,
        loading: groupsLoading,
        error: groupsError,
        refetch: groupsRefetch,
    } = useQuery<IFetchAllGroups>(GET_ALL_GROUPS);

    const [createGroup] = useMutation(CREATE_GROUP);
    const [updateGroup] = useMutation(UPDATE_GROUP);
    const [removeGroup] = useMutation(REMOVE_GROUP);

    const createCallback = async (group: Omit<IGroup, 'id'>) => {
        await createGroup({
            variables: {
                number: group.number,
                form: group.form,
            },
        });
        await groupsRefetch();
    };

    const editCallback = async (group: IGroup) => {
        await updateGroup({
            variables: {
                id: group.id,
                number: group.number,
                form: group.form,
            },
        });
        await groupsRefetch();
    };

    const removeCallback = async (groupId: number) => {
        await removeGroup({
            variables: {
                id: groupId,
            },
        });
        await groupsRefetch();
    };

    return (
        <MainContentContainer header='Groups'>
            <GroupsTable
                groups={groupsData?.groups}
                isLoading={groupsLoading}
                createCallback={createCallback}
                editCallback={editCallback}
                removeCallback={removeCallback}
            />
        </MainContentContainer>
    );
}

export default Groups;
