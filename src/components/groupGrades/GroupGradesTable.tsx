import { Box, NativeSelect, Typography } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useMemo } from 'react';
import {
    IGroupScheduleForAbsencesAndGrades,
    IGroupStudent,
} from '../../core/services/groupAbsences.service';
import { IGroupGrade } from '../../core/services/teacherGroupAbsencesAndGrades.service';

type Props = {
    students?: IGroupStudent[];
    schedule?: IGroupScheduleForAbsencesAndGrades;
    grades?: IGroupGrade[];
    setGrade: (lessonId: string, studentId: string, value: number) => void;
    isLoading: boolean;
};

function GroupGradesTable({ students, schedule, grades, setGrade, isLoading }: Props) {
    function getStudentFullName(student: IGroupStudent) {
        return `${student.surname} ${student.name}`;
    }

    useEffect(() => {
        console.log(grades);
    }, [grades]);

    const columns = useMemo<MRT_ColumnDef<IGroupStudent>[]>(() => {
        const lessonsColumns: MRT_ColumnDef<IGroupStudent>[] = [];

        schedule?.days.forEach((day) => {
            if (day.lessons.length != 0)
                lessonsColumns.push({
                    id: day.date.toISOString(),
                    header: day.date.toLocaleDateString('ru-RU'),
                    columns: day.lessons.map((lesson) => {
                        return {
                            id: lesson.id.toString(),
                            header: `${lesson.subject.course.name}. ${lesson.subject.type.name} 
                            (${new Date(lesson.startTime).toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })} - ${new Date(lesson.endTime).toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })})`,
                            accessorFn: (student: IGroupStudent) => student,
                            Cell: ({ cell, column }) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <NativeSelect
                                        value={
                                            grades?.find(
                                                (grade) =>
                                                    grade.lessonId == column.id &&
                                                    grade.studentId ==
                                                        cell.getValue<IGroupStudent>().studentId
                                            )?.value ?? -1
                                        }
                                        onChange={(event) =>
                                            setGrade(
                                                column.id,
                                                cell.getValue<IGroupStudent>().studentId,
                                                parseInt(event.target.value as string)
                                            )
                                        }
                                    >
                                        {[-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                            <option value={item} key={item}>
                                                {item != -1 ? item : '-'}
                                            </option>
                                        ))}
                                    </NativeSelect>
                                </Box>
                            ),
                            size: 10,
                            enableSorting: false,
                        };
                    }),
                });
        });

        return [
            {
                header: 'Students',
                accessorFn: (student) => student,
                Cell: ({ cell }) => (
                    <Typography variant='subtitle2' sx={{ paddingLeft: 1 }}>
                        {getStudentFullName(cell.getValue<IGroupStudent>())}
                    </Typography>
                ),
            },
            ...lessonsColumns,
        ];
    }, [students, schedule, grades]);

    return (
        <MaterialReactTable
            columns={columns}
            data={students ?? []}
            enableStickyHeader
            enableColumnActions={false}
            enablePinning
            initialState={{
                columnPinning: { left: ['Students'] },
                density: 'compact',
                isLoading: true,
            }}
            state={{
                isLoading: isLoading,
            }}
            muiTableHeadCellProps={{
                sx: {
                    border: '1px solid #808080',
                },
            }}
            muiTableBodyCellProps={{
                sx: {
                    border: '1px solid #808080',
                },
            }}
        />
    );
}

export default GroupGradesTable;
