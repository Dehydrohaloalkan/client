import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { Context } from '../../components/GlobalContext';
import GradesTable from '../../components/grades/GradesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { GET_GRADES, IFetchStudentGrades } from '../../core/services/studentGrades.service';

type Props = {};

function Grades({}: Props) {
    const { store } = useContext(Context);

    const { loading, data, refetch, error } = useQuery<IFetchStudentGrades>(GET_GRADES, {
        variables: { id: store.user.id },
        pollInterval: 1000 * 60 * 15,
    });

    return (
        <MainContentContainer header='Grades'>
            <GradesTable grades={data?.studentByUser.grades} isLoading={loading} />
        </MainContentContainer>
    );
}

export default Grades;
