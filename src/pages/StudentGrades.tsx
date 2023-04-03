import { useEffect, useState } from 'react';
import GradesTable from '../components/grades/GradesTable';
import MainContentContainer from '../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../core/hooks/useFetching';
import { getGrades } from '../core/services/Grades';
import { GradeType } from '../core/types/Grades';

type Props = {};

function StudentGrades({}: Props) {
    const [grades, setGrades] = useState<GradeType[]>([]);

    const [fetchGrades, isLoading, error] = useFetching(async () => {
        const grades = await getGrades();
        setGrades(grades);
    });

    useEffect(() => {
        fetchGrades();
    }, []);

    return (
        <MainContentContainer header='Grades'>
            <GradesTable grades={grades} isLoading={isLoading} />
        </MainContentContainer>
    );
}

export default StudentGrades;
