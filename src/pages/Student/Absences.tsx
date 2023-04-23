import { useEffect, useState } from 'react';
import AbsencesTable from '../../components/absences/AbsencesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { IStudentAbsences } from '../../core/models';
import { AbsencesService } from '../../core/services';

type Props = {};

function Absences({}: Props) {
    const [absences, setAbsences] = useState<IStudentAbsences[]>([]);

    const [fetchAbsences, isLoading, error] = useFetching(async () => {
        const data = await AbsencesService.getStudentAbsences();
        setAbsences(data);
    });

    useEffect(() => {
        fetchAbsences();
    }, []);

    return (
        <MainContentContainer header='Absences'>
            <AbsencesTable absences={absences} isLoading={isLoading} />
        </MainContentContainer>
    );
}

export default Absences;
