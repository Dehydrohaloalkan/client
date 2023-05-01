import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Container } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../components/GlobalContext';
import GroupGradesTable from '../../components/groupGrades/GroupGradesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import TeacherSelects from '../../components/teacher/TeacherSelects';
import { createGroupScheduleForAbsencesAndGrades } from '../../core/services/groupAbsences.service';
import {
    GET_GROUP_INFO_BY_GROUP_ID,
    GET_GROUP_SUBJECT_GRADES,
    GET_GROUP_SUBJECT_SCHEDULE,
    IFetchGroupInfo,
    IFetchGroupSubjectGrades,
    IFetchGroupSubjectSchedule,
    IGroupGrade,
    SET_GROUP_GRADE,
} from '../../core/services/teacherGroupAbsencesAndGrades.service';

type Props = {};

function GroupsGrades({}: Props) {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    const [week, setWeek] = useState(0);
    const [selectedSubjectId, setSelectedSubjectId] = useState<number>(-1);
    const [selectedGroupId, setSelectedGroupId] = useState<number>(-1);
    const [grades, setGrades] = useState<IGroupGrade[]>([]);

    const [getGroup, { loading: groupLoading, data: groupData, error: groupError }] =
        useLazyQuery<IFetchGroupInfo>(GET_GROUP_INFO_BY_GROUP_ID, {
            variables: { groupId: selectedGroupId },
        });

    const [getSchedule, { loading: scheduleLoading, data: scheduleData, error: scheduleError }] =
        useLazyQuery<IFetchGroupSubjectSchedule>(GET_GROUP_SUBJECT_SCHEDULE, {
            variables: { groupId: selectedGroupId, week: week, subjectId: selectedSubjectId },
        });

    const [getGrades, { loading: gradesLoading, data: gradesData, error: gradesError }] =
        useLazyQuery<IFetchGroupSubjectGrades>(GET_GROUP_SUBJECT_GRADES, {
            variables: { groupId: selectedGroupId, week: week, subjectId: selectedSubjectId },
        });

    const [setGradeMutation] = useMutation(SET_GROUP_GRADE);

    useEffect(() => {
        (async () => {
            if (selectedGroupId != -1) {
                await getGroup();
                await getSchedule();
                await getGrades();
            }
        })();
    }, [selectedGroupId]);

    useEffect(() => {
        if (!gradesLoading) {
            setGrades(gradesData?.group.subjectGrades ?? []);
        }
    }, [gradesLoading]);

    const onSetGrade = async (lessonId: string, studentId: string, value: number) => {
        if (grades.find((grade) => grade.lessonId == lessonId && grade.studentId == studentId)) {
            if (value == -1) {
                setGrades(
                    grades.filter(
                        (grade) => grade.lessonId != lessonId || grade.studentId != studentId
                    )
                );
                setGradeMutation({
                    variables: {
                        studentId: studentId,
                        lessonId: lessonId,
                        value: value,
                    },
                });
            } else {
                setGrades([
                    ...grades.filter(
                        (grade) => grade.lessonId != lessonId || grade.studentId != studentId
                    ),
                    { lessonId: lessonId, studentId: studentId, value: value },
                ]);
                setGradeMutation({
                    variables: {
                        studentId: studentId,
                        lessonId: lessonId,
                        value: value,
                    },
                });
            }
        } else {
            if (value != -1) {
                setGrades([...grades, { lessonId: lessonId, studentId: studentId, value: value }]);
                setGradeMutation({
                    variables: {
                        studentId: studentId,
                        lessonId: lessonId,
                        value: value,
                    },
                });
            }
        }
    };

    const goToPrevWeek = () => {
        setWeek(week - 1);
        navigate(`/groupsGrades/${week - 1}`);
    };

    const goToNextWeek = () => {
        setWeek(week + 1);
        navigate(`/groupsGrades/${week + 1}`);
    };

    return (
        <MainContentContainer header='Groups Grades'>
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
                        <GroupGradesTable
                            schedule={createGroupScheduleForAbsencesAndGrades(
                                scheduleData?.group.subjectSchedule
                            )}
                            students={groupData?.group.students}
                            grades={grades}
                            setGrade={onSetGrade}
                            isLoading={groupLoading || scheduleLoading || gradesLoading}
                        />
                    </>
                )}
            </Container>
        </MainContentContainer>
    );
}

export default GroupsGrades;
