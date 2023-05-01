import { useMutation, useQuery } from '@apollo/client';
import { useContext } from 'react';
import { Context } from '../../components/GlobalContext';
import GroupTable from '../../components/group/GroupTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import {
    GET_GROUP_WITH_STUDENTS,
    IFetchStudentGroup,
    IStudent,
    UPDATE_STUDENT,
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

    const [updateStudent] = useMutation(UPDATE_STUDENT);

    const onStudentEdit = (student: IStudent) => {
        updateStudent({
            variables: {
                studentId: student.studentId,
                subgroup: student.subgroup,
                isLeader: student.isLeader,
                isMarking: student.isMarking,
            },
        });
        refetch();
    };

    return (
        <MainContentContainer header='Group'>
            <GroupTable
                students={data?.studentByUser.group.students}
                editCallback={onStudentEdit}
                isLoading={loading}
            />
        </MainContentContainer>
    );
}

export default Group;
