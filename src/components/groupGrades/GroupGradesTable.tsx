import { Box, NativeSelect, Typography } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { GradeType } from '../../core/types/Grades';
import { StudentType } from '../../core/types/Group';
import { ScheduleType } from '../../core/types/Schedule';

type Props = {
    students: StudentType[];
    schedule: ScheduleType[];
    grades: GradeType[];
    addGrade: (lessonId: number, studentId: number, grade: number) => void;
    removeGrade: (lessonId: number, studentId: number) => void;
    isLoading: boolean;
};

function GroupGradesTable({ students, schedule, grades, addGrade, removeGrade, isLoading }: Props) {
    const getGrade = (lessonId: number, studentId: number): number => {
        const index = grades.findIndex(
            (grade) => grade.lesson.id == lessonId && grade.student.id == studentId
        );
        return index != -1 ? grades[index].grade : -1;
    };

    const onGradeChange = (lessonId: number, studentId: number, grade: number) => {
        if (grade != -1) addGrade(lessonId, studentId, grade);
        else removeGrade(lessonId, studentId);
    };

    const columns = useMemo<MRT_ColumnDef<StudentType>[]>(() => {
        const lessonsColumns: MRT_ColumnDef<StudentType>[] = [];

        schedule.forEach((day) => {
            if (day.lessons.length != 0)
                lessonsColumns.push({
                    id: day.date.toISOString(),
                    header: day.date.toLocaleDateString('ru-RU'),
                    columns: day.lessons.map((lesson) => {
                        return {
                            id: lesson.id.toString(),
                            header: lesson.subject.name,
                            accessorFn: (student) => student,
                            Cell: ({ cell, column }) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <NativeSelect
                                        defaultValue={getGrade(
                                            Number.parseInt(column.id),
                                            cell.getValue<StudentType>().id
                                        )}
                                        onChange={(event) =>
                                            onGradeChange(
                                                Number.parseInt(column.id),
                                                cell.getValue<StudentType>().id,
                                                parseInt(event.target.value as string)
                                            )
                                        }
                                    >
                                        {[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                            <option value={item} key={item}>
                                                {item != -1 ? item : ''}
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
                        {/* {getStudentFullName(cell.getValue<StudentType>())} */}
                    </Typography>
                ),
            },
            ...lessonsColumns,
        ];
    }, [students, schedule, grades]);

    return (
        <MaterialReactTable
            columns={columns}
            data={students}
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
