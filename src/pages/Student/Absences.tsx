import { useEffect, useState } from 'react';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import AbsencesTable from '../../components/absences/AbsencesTable';
import { useFetching } from '../../core/hooks/useFetching';
import { IStudentAbsences } from '../../core/models';
import AbsencesService from '../../core/services/absences.service';

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
        <MainContentContainer header='Passes'>
            <AbsencesTable absences={absences} isLoading={isLoading} />
        </MainContentContainer>
    );
}

export default Absences;
