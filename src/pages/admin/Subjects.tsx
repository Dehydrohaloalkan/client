import { useMutation, useQuery } from '@apollo/client';
import { Box, Container } from '@mui/material';
import { useState } from 'react';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import CreateButtonBlock from '../../components/subjectConstructor/CreateButtonBlock';
import EditBlock from '../../components/subjectConstructor/EditBlock';
import RemoveSubjectModal from '../../components/subjectConstructor/RemoveSubjectModal';
import SubjectBlock from '../../components/subjectConstructor/SubjectBlock';
import { GET_ALL_COURSES, IFetchAllCourses } from '../../core/services/adminCourses.service';
import { GET_ALL_GROUPS, IFetchAllGroups } from '../../core/services/adminStudents.service';
import {
    CREATE_SUBJECT,
    GET_ALL_SUBJECTS,
    GET_ALL_TYPES,
    ICreateUpdateSubject,
    IFetchAllSubjects,
    IFetchAllTypes,
    ISubject,
    REMOVE_SUBJECT,
    UPDATE_SUBJECT,
} from '../../core/services/adminSubjects.service';
import { GET_ALL_TEACHERS, IFetchAllTeachers } from '../../core/services/adminUsers.service';

type Props = {};

function Subjects({}: Props) {
    const [selectedSubject, setSelectedSubject] = useState<ISubject>();
    const [subjectForRemove, setSubjectForRemove] = useState<ISubject>();
    const [removeOpen, setRemoveOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [flag, setFlag] = useState(false);

    const {
        data: subjectsData,
        loading: subjectsLoading,
        refetch: subjectRefetch,
        error: subjectsError,
    } = useQuery<IFetchAllSubjects>(GET_ALL_SUBJECTS, {
        fetchPolicy: 'network-only',
    });

    const {
        data: coursesData,
        loading: coursesLoading,
        refetch: courseRefetch,
        error: coursesError,
    } = useQuery<IFetchAllCourses>(GET_ALL_COURSES, {
        fetchPolicy: 'cache-and-network',
    });

    const {
        data: typesData,
        loading: typesLoading,
        refetch: typesRefetch,
        error: typesError,
    } = useQuery<IFetchAllTypes>(GET_ALL_TYPES, {
        fetchPolicy: 'cache-and-network',
    });

    const {
        data: teachersData,
        loading: teachersLoading,
        refetch: teachersRefetch,
        error: teachersError,
    } = useQuery<IFetchAllTeachers>(GET_ALL_TEACHERS, {
        fetchPolicy: 'cache-and-network',
    });

    const {
        data: groupsData,
        loading: groupsLoading,
        refetch: groupsRefetch,
        error: groupsError,
    } = useQuery<IFetchAllGroups>(GET_ALL_GROUPS, {
        fetchPolicy: 'cache-and-network',
    });

    const [createSubjectMutation] = useMutation(CREATE_SUBJECT);
    const [updateSubjectMutation] = useMutation(UPDATE_SUBJECT);
    const [removeSubjectMutation] = useMutation(REMOVE_SUBJECT);

    const onEditSave = async (subject: ICreateUpdateSubject) => {
        setFlag(true);
        await updateSubjectMutation({
            variables: {
                id: subject.id,
                courseId: subject.courseId,
                typeId: subject.typeId,
                teacherId: subject.teacherId,
                recurrence: subject.recurrence,
                groupIds: subject.groups,
            },
        });
        setSelectedSubject(undefined);
        await subjectRefetch();
        setFlag(false);
    };

    const onCreateSave = async (subject: ICreateUpdateSubject) => {
        await createSubjectMutation({
            variables: {
                courseId: subject.courseId,
                typeId: subject.typeId,
                teacherId: subject.teacherId,
                recurrence: subject.recurrence,
                groupIds: subject.groups,
            },
        });
        setCreateOpen(false);
        await subjectRefetch();
    };

    const onRemove = async (id: number) => {
        await removeSubjectMutation({
            variables: {
                id: id,
            },
        });
        await subjectRefetch();
        setRemoveOpen(false);
    };

    const openRemoveModal = (subject: ISubject) => {
        setSubjectForRemove(subject);
        setRemoveOpen(true);
    };

    return (
        <MainContentContainer header='Subjects'>
            <Container>
                {subjectsData &&
                    !flag &&
                    subjectsData.subjects.map((subject) =>
                        selectedSubject?.id == subject.id ? (
                            <EditBlock
                                courses={coursesData?.courses || []}
                                types={typesData?.types || []}
                                teachers={teachersData?.teachers || []}
                                groups={groupsData?.groups || []}
                                subject={subject}
                                key={subject.id}
                                onCancel={() => setSelectedSubject(undefined)}
                                onSave={onEditSave}
                            />
                        ) : (
                            <SubjectBlock
                                subject={subject}
                                key={subject.id}
                                onEdit={() => setSelectedSubject(subject)}
                                onRemove={() => openRemoveModal(subject)}
                            />
                        )
                    )}
                {!createOpen ? (
                    <CreateButtonBlock setCreateOpen={setCreateOpen} />
                ) : (
                    <EditBlock
                        courses={coursesData?.courses || []}
                        types={typesData?.types || []}
                        teachers={teachersData?.teachers || []}
                        groups={groupsData?.groups || []}
                        onCancel={() => setCreateOpen(false)}
                        onSave={onCreateSave}
                    />
                )}
                <Box sx={{ height: 300 }} />
                <RemoveSubjectModal
                    open={removeOpen}
                    onClose={setRemoveOpen}
                    onConfirm={onRemove}
                    subject={subjectForRemove}
                />
            </Container>
        </MainContentContainer>
    );
}

export default Subjects;
