import { Button, Checkbox, Container, FormControlLabel } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../components/GlobalContext';
import GroupPassesTable from '../../components/groupPasses/GroupPassesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { getGroup } from '../../core/services/Group';
import { addPass, getPasses, removePass } from '../../core/services/Passes';
import { getSchedule } from '../../core/services/Schedule';
import { StudentType } from '../../core/types/Group';
import { PassType } from '../../core/types/Passes';
import { ScheduleType } from '../../core/types/Schedule';

type Props = {};

function GroupPasses({}: Props) {
    const [schedule, setSchedule] = useState<ScheduleType[]>([]);
    const [students, setStudents] = useState<StudentType[]>([]);
    const [passes, setPasses] = useState<PassType[]>([]);
    const [week, setWeek] = useState(0);
    const navigate = useNavigate();
    const params = useParams();
    const { user } = useContext(Context);

    const [fetchData, isLoading, error] = useFetching(async () => {
        setPasses(Array.from(await getPasses()));
        setSchedule(Array.from(await getSchedule(week)));
        setStudents(
            Array.from((await getGroup(user!.student!.groupId)).students)
        );
    });

    useEffect(() => {
        fetchData();
        setWeek(Number.parseInt(params.week!));
    }, [week]);

    const onAddPass = async (lessonId: number, studentId: number) => {
        addPass(lessonId, studentId);
        passes.push({
            lesson: {
                id: lessonId,
                name: 'Матеша',
                date: new Date('01.02.2020'),
            },
            student: {
                id: studentId,
            },
            hours: 2,
        });
        setPasses(Array.from(passes));
    };
    const onRemovePass = async (lessonId: number, studentId: number) => {
        removePass(lessonId, studentId);
        passes.splice(
            passes.findIndex(
                (pass) =>
                    pass.student.id == studentId && pass.lesson.id == lessonId
            ),
            1
        );
        setPasses(Array.from(passes));
    };

    const goToPrevWeek = () => {
        setWeek(week - 1);
        navigate(`/passes/edit/${week - 1}`);
    };

    const goToNextWeek = () => {
        setWeek(week + 1);
        navigate(`/passes/edit/${week + 1}`);
    };

    return (
        <MainContentContainer header='Add Passes'>
            <Container>
                <Button
                    sx={{ margin: 1 }}
                    variant='contained'
                    onClick={() => goToPrevWeek()}
                >
                    Save and go to Previous Week
                </Button>
                <Button
                    sx={{ margin: 1 }}
                    variant='contained'
                    onClick={() => goToNextWeek()}
                >
                    Save and go to Next Week
                </Button>
                <Button sx={{ margin: 1 }} variant='contained' color='success'>
                    Save
                </Button>
                <GroupPassesTable
                    schedule={schedule}
                    students={students}
                    passes={passes}
                    addPass={onAddPass}
                    removePass={onRemovePass}
                    isLoading={isLoading}
                />
                <FormControlLabel
                    disabled
                    control={<Checkbox defaultChecked />}
                    label=' - pass'
                />
            </Container>
        </MainContentContainer>
    );
}

export default GroupPasses;
