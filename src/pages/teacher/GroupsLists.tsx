import { useLazyQuery } from '@apollo/client';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import GroupTable from '../../components/group/GroupTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import TeacherSelects from '../../components/teacher/TeacherSelects';
import {
    GET_GROUP_BY_GROUP_ID,
    IFetchGroupByGroupId,
} from '../../core/services/teacherSubjectsAndGroups.service';

type Props = {};

function GroupsLists({}: Props) {
    const [selectedSubjectId, setSelectedSubjectId] = useState<number>(-1);
    const [selectedGroupId, setSelectedGroupId] = useState<number>(-1);

    const [getGroupByGroupId, { data, loading, error }] = useLazyQuery<IFetchGroupByGroupId>(
        GET_GROUP_BY_GROUP_ID,
        { variables: { groupId: selectedGroupId } }
    );

    useEffect(() => {
        getGroupByGroupId();
    }, [selectedGroupId]);

    return (
        <MainContentContainer header='Groups Lists'>
            <Container>
                <TeacherSelects
                    selectedSubjectId={selectedSubjectId}
                    setSelectedSubjectId={setSelectedSubjectId}
                    selectedGroupId={selectedGroupId}
                    setSelectedGroupId={setSelectedGroupId}
                ></TeacherSelects>
                {selectedGroupId != -1 && (
                    <GroupTable students={data?.group.students} isLoading={loading} />
                )}
            </Container>
        </MainContentContainer>
    );
}

export default GroupsLists;
