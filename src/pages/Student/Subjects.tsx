import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { Context } from '../../components/GlobalContext';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import SubjectsTable from '../../components/subjects/SubjectsTable';
import { GET_SUBJECTS, IFetchStudentSubjects } from '../../core/services/studentSubjects.service';

type Props = {};

function Subjects({}: Props) {
    const { store } = useContext(Context);

    const { loading, data, refetch, error } = useQuery<IFetchStudentSubjects>(GET_SUBJECTS, {
        variables: { id: store.user.id },
        pollInterval: 1000,
    });

    return (
        <MainContentContainer header='Subjects'>
            <SubjectsTable subjects={data?.studentByUser.group.subjects} isLoading={loading} />
        </MainContentContainer>
    );
}

export default Subjects;
