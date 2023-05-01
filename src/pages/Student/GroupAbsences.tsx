import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Button, Checkbox, Container, FormControlLabel } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../components/GlobalContext';
import GroupAbsencesTable from '../../components/groupAbsences/GroupAbsencesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import {
    ADD_GROUP_ABSENCE,
    GET_GROUP_ABSENCES,
    GET_GROUP_FOR_ABSENCES,
    GET_GROUP_SCHEDULE,
    IFetchGroupAbsences,
    IFetchGroupForAbsences,
    IFetchGroupSchedule,
    IGroupAbsence,
    REMOVE_GROUP_ABSENCE,
    createGroupScheduleForAbsencesAndGrades,
} from '../../core/services/groupAbsences.service';

type Props = {};

function GroupAbsences({}: Props) {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    const [week, setWeek] = useState(0);
    const [absences, setAbsences] = useState<IGroupAbsence[]>([]);

    const {
        loading: groupLoading,
        data: groupData,
        refetch: groupRefetch,
        error: groupError,
    } = useQuery<IFetchGroupForAbsences>(GET_GROUP_FOR_ABSENCES, {
        variables: { id: store.user.id },
        pollInterval: 1000 * 60 * 15,
    });

    const [getSchedule, { loading: scheduleLoading, data: scheduleData, error: scheduleError }] =
        useLazyQuery<IFetchGroupSchedule>(GET_GROUP_SCHEDULE, {
            variables: { groupId: groupData?.studentByUser.group.id, week: week },
        });

    const [getAbsences, { loading: absencesLoading, data: absencesData, error: absencesError }] =
        useLazyQuery<IFetchGroupAbsences>(GET_GROUP_ABSENCES, {
            variables: { groupId: groupData?.studentByUser.group.id, week: week },
        });

    const [addAbsenceMutation] = useMutation(ADD_GROUP_ABSENCE);
    const [removeAbsenceMutation] = useMutation(REMOVE_GROUP_ABSENCE);

    useEffect(() => {
        if (!groupLoading) {
            getSchedule();
            getAbsences();
        }
    }, [groupLoading]);

    useEffect(() => {
        if (!absencesLoading) {
            setAbsences(absencesData?.group.absences ?? []);
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
        navigate(`/absences/edit/${week - 1}`);
    };

    const goToNextWeek = () => {
        setWeek(week + 1);
        navigate(`/absences/edit/${week + 1}`);
    };

    return (
        <MainContentContainer header='Add Absences'>
            <Container>
                <Button sx={{ margin: 1 }} variant='contained' onClick={goToPrevWeek}>
                    Previous Week
                </Button>
                <Button sx={{ margin: 1 }} variant='contained' onClick={goToNextWeek}>
                    Next Week
                </Button>

                <GroupAbsencesTable
                    schedule={createGroupScheduleForAbsencesAndGrades(scheduleData?.group.schedule)}
                    students={groupData?.studentByUser.group.students}
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
            </Container>
        </MainContentContainer>
    );
}

export default GroupAbsences;
