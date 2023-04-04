import { useEffect, useState } from 'react';
import SubjectsTable from '../../components/courses/CoursesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { getSubjects } from '../../core/services/Subjects';
import { SubjectType } from '../../core/types/Subject';

type Props = {};

function Subjects({}: Props) {
    const [subjects, setSubjects] = useState<SubjectType[]>([]);

    const [fetchSubjects, isLoading, error] = useFetching(async () => {
        const data = await getSubjects();
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
