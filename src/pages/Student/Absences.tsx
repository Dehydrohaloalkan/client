import { useContext, useEffect, useState } from 'react';
import AbsencesTable from '../../components/absences/AbsencesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { IStudentAbsences } from '../../core/models';
import { AbsencesService } from '../../core/services';
import { Context } from '../../components/GlobalContext';
import { useQuery } from '@apollo/client';
import { GET_ABSENCES, IFetchStudentAbsences } from '../../core/services/studentAbsences.service';

type Props = {};

function Absences({}: Props) {
    const { store } = useContext(Context);

    const { loading, data, refetch, error } = useQuery<IFetchStudentAbsences>(GET_ABSENCES, {
        variables: { id: store.user.id },
        pollInterval: 1000,
    });

    return (
        <MainContentContainer header='Absences'>
            <AbsencesTable absences={data?.studentByUser.absences} isLoading={loading} />
        </MainContentContainer>
    );
}

export default Absences;
