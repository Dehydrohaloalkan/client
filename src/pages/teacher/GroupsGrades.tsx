import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupGradesTable from '../../components/groupGrades/GroupGradesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';

import { GradeType } from '../../core/types/Grades';
import { GroupInfoType, StudentType } from '../../core/types/Group';
import { ScheduleType } from '../../core/types/Schedule';

type Props = {};

function GroupsPasses({}: Props) {
    const [groups, setGroups] = useState<GroupInfoType[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number>(-1);

    const [schedule, setSchedule] = useState<ScheduleType[]>([]);
    const [students, setStudents] = useState<StudentType[]>([]);
    const [grades, setGrades] = useState<GradeType[]>([]);
    const [week, setWeek] = useState(0);

    const navigate = useNavigate();
    const params = useParams();
    //const { user } = useContext(Context);

    const [fetchData, isLoading, error] = useFetching(async () => {
        if (selectedGroupId != -1) {
            //setGrades(Array.from(await getGrades()));
            //setSchedule(Array.from(await getSchedule(week, selectedGroupId)));
            //setStudents(Array.from((await getGroup(selectedGroupId)).students));
        }
    });

    const [fetchGroups, isLoadingGroups, errorGroups] = useFetching(async () => {
        //setGroups(Array.from(await getGroups()));
    });

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        fetchData();
        setWeek(Number.parseInt(params.week!));
    }, [week, selectedGroupId]);

    const goToPrevWeek = () => {
        setWeek(week - 1);
        navigate(`/groupsGrades/${week - 1}`);
    };

    const goToNextWeek = () => {
        setWeek(week + 1);
        navigate(`/groupsGrades/${week + 1}`);
    };

    const onAddGrade = async (lessonId: number, studentId: number, grade: number) => {
        //addGrade(lessonId, studentId, grade);
        grades.push({
            lesson: {
                id: lessonId,
                name: 'Матеша',
                date: new Date('01.02.2020'),
            },
            student: {
                id: studentId,
            },
            grade: grade,
        });
        setGrades(Array.from(grades));
    };
    const onRemoveGrade = async (lessonId: number, studentId: number) => {
        //removeGrade(lessonId, studentId);
        grades.splice(
            grades.findIndex(
                (grade) => grade.student.id == studentId && grade.lesson.id == lessonId
            ),
            1
        );
        setGrades(Array.from(grades));
    };

    return (
        <MainContentContainer header='Groups Grades'>
            <Container>
                {!isLoadingGroups && (
                    <FormControl sx={{ margin: 3, minWidth: 150 }}>
                        <InputLabel htmlFor='grouped-select'>Group</InputLabel>
                        <Select
                            value={selectedGroupId}
                            id='group-select'
                            label='Group'
                            onChange={(event) => {
                                setSelectedGroupId(parseInt(event.target.value as string, 10));
                            }}
                        >
                            <MenuItem value={-1}>
                                <em>None</em>
                            </MenuItem>
                            {/* {Object.entries(reduceGroupsByForm(groups)).map(
                                (item) => [
                                    <ListSubheader
                                        key={Number.parseInt(item[0])}
                                    >
                                        Form {item[0]}
                                    </ListSubheader>,
                                    item[1].map((group) => (
                                        <MenuItem
                                            value={group.id}
                                            key={group.id}
                                        >
                                            {group.number}
                                        </MenuItem>
                                    )),
                                ]
                            )} */}
                        </Select>
                    </FormControl>
                )}

                {selectedGroupId != -1 && (
                    <>
                        <div>
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
                        </div>
                        <GroupGradesTable
                            schedule={schedule}
                            students={students}
                            grades={grades}
                            addGrade={onAddGrade}
                            removeGrade={onRemoveGrade}
                            isLoading={isLoading}
                        />
                        <FormControlLabel
                            disabled
                            control={<Checkbox defaultChecked />}
                            label=' - pass'
                        />
                    </>
                )}
            </Container>
        </MainContentContainer>
    );
}

export default GroupsPasses;
