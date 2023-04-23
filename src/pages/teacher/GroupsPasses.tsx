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
import GroupPassesTable from '../../components/groupPasses/GroupPassesTable';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../../core/hooks/useFetching';
import { GroupInfoType, StudentType } from '../../core/types/Group';
import { PassType } from '../../core/types/Passes';
import { ScheduleType } from '../../core/types/Schedule';

type Props = {};

function GroupsPasses({}: Props) {
    const [groups, setGroups] = useState<GroupInfoType[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number>(-1);

    const [schedule, setSchedule] = useState<ScheduleType[]>([]);
    const [students, setStudents] = useState<StudentType[]>([]);
    const [passes, setPasses] = useState<PassType[]>([]);
    const [week, setWeek] = useState(0);

    const navigate = useNavigate();
    const params = useParams();
    //const { user } = useContext(Context);

    const [fetchData, isLoading, error] = useFetching(async () => {
        if (selectedGroupId != -1) {
            //setPasses(Array.from(await getPasses()));
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
        navigate(`/groupsPasses/${week - 1}`);
    };

    const goToNextWeek = () => {
        setWeek(week + 1);
        navigate(`/groupsPasses/${week + 1}`);
    };

    const onAddPass = async (lessonId: number, studentId: number) => {
        //addPass(lessonId, studentId);
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
        //removePass(lessonId, studentId);
        passes.splice(
            passes.findIndex((pass) => pass.student.id == studentId && pass.lesson.id == lessonId),
            1
        );
        setPasses(Array.from(passes));
    };

    return (
        <MainContentContainer header='Groups Passes'>
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
                    </>
                )}
            </Container>
        </MainContentContainer>
    );
}

export default GroupsPasses;
