import { useEffect, useState } from 'react';
import GradesTable from '../../components/grades/GradesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { GradeType } from '../../core/types/Grades';

type Props = {};

function Grades({}: Props) {
    const [grades, setGrades] = useState<GradeType[]>([]);

    const [fetchGrades, isLoading, error] = useFetching(async () => {
        //const data = await getGrades();
        //setGrades(data);
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

export default Grades;
