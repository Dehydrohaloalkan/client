import { useEffect, useState } from 'react';
import MainContentContainer from '../components/main/ContentContainer/MainContentContainer';
import PassesTable from '../components/passes/PassesTable';
import { useFetching } from '../core/hooks/useFetching';
import { getPasses } from '../core/services/Passes';
import { PassType } from '../core/types/Passes';

type Props = {};

function StudentPasses({}: Props) {
    const [passes, setPasses] = useState<PassType[]>([]);

    const [fetchPasses, isLoading, error] = useFetching(async () => {
        const passes = await getPasses();
        setPasses(passes);
    });

    useEffect(() => {
        fetchPasses();
    }, []);

    return (
        <MainContentContainer header='Passes'>
            <PassesTable passes={passes} isLoading={isLoading} />
        </MainContentContainer>
    );
}

export default StudentPasses;
