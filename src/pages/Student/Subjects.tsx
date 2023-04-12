import { useEffect, useState } from 'react';
import SubjectsTable from '../../components/subjects/SubjectsTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { getSubjects } from '../../core/services/Subjects';
import { SubjectType } from '../../core/types/Subject';
import { ISubject } from '../../core/models';
import SubjectsService from '../../core/services/subjects.service';

type Props = {};

function Subjects({}: Props) {
    const [subjects, setSubjects] = useState<ISubject[]>([]);

    const [fetchSubjects, isLoading, error] = useFetching(async () => {
        const data = await SubjectsService.getStudentSubjects();
        setSubjects(data);
    });

    useEffect(() => {
        fetchSubjects();
    }, []);

    return (
        <MainContentContainer header='Subjects'>
            <SubjectsTable subjects={subjects} isLoading={isLoading} />
        </MainContentContainer>
    );
}

export default Subjects;
