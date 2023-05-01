import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Checkbox, Container, FormControlLabel } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../components/GlobalContext';
import GroupAbsencesTable from '../../components/groupAbsences/GroupAbsencesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import TeacherSelects from '../../components/teacher/TeacherSelects';
import {
    ADD_GROUP_ABSENCE,
    IGroupAbsence,
    REMOVE_GROUP_ABSENCE,
    createGroupScheduleForAbsencesAndGrades,
} from '../../core/services/groupAbsences.service';
import {
    GET_GROUP_INFO_BY_GROUP_ID,
    GET_GROUP_SUBJECT_ABSENCES,
    GET_GROUP_SUBJECT_SCHEDULE,
    IFetchGroupInfo,
    IFetchGroupSubjectAbsences,
    IFetchGroupSubjectSchedule,
} from '../../core/services/teacherGroupAbsencesAndGrades.service';

type Props = {};

function GroupsAbsences({}: Props) {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    const [week, setWeek] = useState(0);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number>(-1);
    const [selectedGroupId, setSelectedGroupId] = useState<number>(-1);
    const [absences, setAbsences] = useState<IGroupAbsence[]>([]);

    const [getGroup, { loading: groupLoading, data: groupData, error: groupError }] =
        useLazyQuery<IFetchGroupInfo>(GET_GROUP_INFO_BY_GROUP_ID, {
            variables: { groupId: selectedGroupId },
        });

    const [getSchedule, { loading: scheduleLoading, data: scheduleData, error: scheduleError }] =
        useLazyQuery<IFetchGroupSubjectSchedule>(GET_GROUP_SUBJECT_SCHEDULE, {
            variables: { groupId: selectedGroupId, week: week, subjectId: selectedSubjectId },
        });

    const [getAbsences, { loading: absencesLoading, data: absencesData, error: absencesError }] =
        useLazyQuery<IFetchGroupSubjectAbsences>(GET_GROUP_SUBJECT_ABSENCES, {
            variables: { groupId: selectedGroupId, week: week, subjectId: selectedSubjectId },
        });

    const [addAbsenceMutation] = useMutation(ADD_GROUP_ABSENCE);
    const [removeAbsenceMutation] = useMutation(REMOVE_GROUP_ABSENCE);

    useEffect(() => {
        (async () => {
            if (selectedGroupId != -1) {
                await getGroup();
                await getSchedule();
                await getAbsences();
            }
        })();
    }, [selectedGroupId]);

    useEffect(() => {
        if (!absencesLoading) {
            setAbsences(absencesData?.group.subjectAbsences ?? []);
        }
    }, [absencesLoading]);

    const onAddAbsence = async (lessonId: string, studentId: string) => {
        setAbsences([...absences, { lessonId, studentId }]);

        await addAbsenceMutation({
            variables: {
                lessonId: lessonId,
                studentId: studentId,
            },
        });
    };

    const onRemoveAbsence = async (lessonId: string, studentId: string) => {
        setAbsences(
            absences.filter(
                (absence) => absence.lessonId !== lessonId || absence.studentId !== studentId
            )
        );

        await removeAbsenceMutation({
            variables: {
                lessonId: lessonId,
                studentId: studentId,
            },
        });
    };

    const goToPrevWeek = () => {
        setWeek(week - 1);
        navigate(`/groupsAbsences/${week - 1}`);
    };

    const goToNextWeek = () => {
        setWeek(week + 1);
        navigate(`/groupsAbsences/${week + 1}`);
    };

    return (
        <MainContentContainer header='Groups Absences'>
            <Container>
                <TeacherSelects
                    selectedSubjectId={selectedSubjectId}
                    setSelectedSubjectId={setSelectedSubjectId}
                    selectedGroupId={selectedGroupId}
                    setSelectedGroupId={setSelectedGroupId}
                ></TeacherSelects>

                {selectedGroupId != -1 && selectedSubjectId != -1 && (
                    <>
                        <Button sx={{ margin: 1 }} variant='contained' onClick={goToPrevWeek}>
                            Previous Week
                        </Button>
                        <Button sx={{ margin: 1 }} variant='contained' onClick={goToNextWeek}>
                            Next Week
                        </Button>
                        <GroupAbsencesTable
                            schedule={createGroupScheduleForAbsencesAndGrades(
                                scheduleData?.group.subjectSchedule
                            )}
                            students={groupData?.group.students}
                            absences={absences}
                            addAbsence={onAddAbsence}
                            removeAbsence={onRemoveAbsence}
                            isLoading={groupLoading || scheduleLoading || absencesLoading}
                        />
                        <FormControlLabel
                            disabled
                            control={<Checkbox defaultChecked />}
                            label=' - absence'
                        />
                    </>
                )}
            </Container>
        </MainContentContainer>
    );
}

export default GroupsAbsences;
