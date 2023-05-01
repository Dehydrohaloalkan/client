import { useMutation, useQuery } from '@apollo/client';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import UsersTable from '../../components/users/UsersTable';
import {
    CREATE_USER,
    GET_ALL_ADMINS,
    IFetchAllAdmins,
    IUser,
    REMOVE_USER,
    UPDATE_USER,
} from '../../core/services/adminUsers.service';

type Props = {};

function Admins({}: Props) {
    const {
        data: adminsData,
        loading: adminsLoading,
        error: adminsError,
        refetch: adminsRefetch,
    } = useQuery<IFetchAllAdmins>(GET_ALL_ADMINS);

    const [createAdmin] = useMutation(CREATE_USER);
    const [updateAdmin] = useMutation(UPDATE_USER);
    const [removeAdmin] = useMutation(REMOVE_USER);

    const createCallback = async (admin: Omit<IUser, 'id'>) => {
        await createAdmin({
            variables: {
                name: admin.name,
                surname: admin.surname,
                patronymic: admin.patronymic,
                email: admin.email,
                roleId: 2,
            },
        });
        await adminsRefetch();
    };

    const editCallback = async (admin: IUser) => {
        await updateAdmin({
            variables: {
                id: admin.id,
                name: admin.name,
                surname: admin.surname,
                patronymic: admin.patronymic,
                email: admin.email,
            },
        });
        await adminsRefetch();
    };

    const removeCallback = async (adminId: string) => {
        await removeAdmin({
            variables: {
                id: adminId,
            },
        });
        await adminsRefetch();
    };

    return (
        <MainContentContainer header='Admins'>
            <UsersTable
                users={adminsData?.admins}
                isLoading={adminsLoading}
                createCallback={createCallback}
                editCallback={editCallback}
                removeCallback={removeCallback}
            />
        </MainContentContainer>
    );
}

export default Admins;
