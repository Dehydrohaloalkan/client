import { useMutation, useQuery } from '@apollo/client';
import GroupTable from '../../components/group/GroupTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import {
    CREATE_STUDENT,
    GET_ALL_STUDENTS,
    IFetchAllStudents,
    REMOVE_STUDENT,
} from '../../core/services/adminStudents.service';
import { IStudent, UPDATE_STUDENT } from '../../core/services/studentGroup.service';

type Props = {};

function Students({}: Props) {
    const { loading, data, refetch, error } = useQuery<IFetchAllStudents>(GET_ALL_STUDENTS, {
        pollInterval: 1000 * 60 * 15,
    });

    const [updateStudent] = useMutation(UPDATE_STUDENT);
    const [createStudent] = useMutation(CREATE_STUDENT);
    const [removeStudent] = useMutation(REMOVE_STUDENT);

    const editCallback = async (student: IStudent) => {
        await updateStudent({
            variables: {
                studentId: student.studentId,
                name: student.name,
                surname: student.surname,
                patronymic: student.patronymic,
                email: student.email,
                subgroup: student.subgroup,
                isLeader: student.isLeader,
                isMarking: student.isMarking,
                groupId: student.groupId,
            },
        });
        await refetch();
    };
    const createCallback = async (student: Omit<IStudent, 'studentId'>) => {
        await createStudent({
            variables: {
                name: student.name,
                surname: student.surname,
                patronymic: student.patronymic,
                email: student.email,
                subgroup: student.subgroup,
                isLeader: student.isLeader,
                isMarking: student.isMarking,
                groupId: student.groupId,
            },
        });
        await refetch();
    };
    const removeCallback = async (studentId: string) => {
        await removeStudent({
            variables: {
                studentId: studentId,
            },
        });
        await refetch();
    };

    return (
        <MainContentContainer header='Students'>
            <GroupTable
                students={data?.students}
                isLoading={loading}
                editCallback={editCallback}
                createCallback={createCallback}
                removeCallback={removeCallback}
            />
        </MainContentContainer>
    );
}

export default Students;
