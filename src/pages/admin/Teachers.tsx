import { useMutation, useQuery } from '@apollo/client';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import UsersTable from '../../components/users/UsersTable';
import {
    CREATE_USER,
    GET_ALL_TEACHERS,
    IFetchAllTeachers,
    IUser,
    REMOVE_USER,
    UPDATE_USER,
} from '../../core/services/adminUsers.service';

type Props = {};

function Teachers({}: Props) {
    const {
        data: teachersData,
        loading: teachersLoading,
        error: teachersError,
        refetch: teachersRefetch,
    } = useQuery<IFetchAllTeachers>(GET_ALL_TEACHERS, {
        fetchPolicy: 'cache-and-network',
    });

    const [createTeacher] = useMutation(CREATE_USER);
    const [updateTeacher] = useMutation(UPDATE_USER);
    const [removeTeacher] = useMutation(REMOVE_USER);

    const createCallback = async (teacher: Omit<IUser, 'userId'>) => {
        await createTeacher({
            variables: {
                name: teacher.name,
                surname: teacher.surname,
                patronymic: teacher.patronymic,
                email: teacher.email,
                roleId: 2,
            },
        });
        await teachersRefetch();
    };

    const editCallback = async (teacher: IUser) => {
        await updateTeacher({
            variables: {
                id: teacher.id,
                name: teacher.name,
                surname: teacher.surname,
                patronymic: teacher.patronymic,
                email: teacher.email,
            },
        });
        await teachersRefetch();
    };

    const removeCallback = async (teacherId: string) => {
        await removeTeacher({
            variables: {
                id: teacherId,
            },
        });
        await teachersRefetch();
    };

    return (
        <MainContentContainer header='Teachers'>
            <UsersTable
                users={teachersData?.teachers}
                isLoading={teachersLoading}
                createCallback={createCallback}
                editCallback={editCallback}
                removeCallback={removeCallback}
            />
        </MainContentContainer>
    );
}

export default Teachers;
