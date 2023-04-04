import { Box, Checkbox, Typography } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { getStudentFullName } from '../../core/services/Group';
import { StudentType } from '../../core/types/Group';
import { PassType } from '../../core/types/Passes';
import { ScheduleType } from '../../core/types/Schedule';

type Props = {
    students: StudentType[];
    schedule: ScheduleType[];
    passes: PassType[];
    addPass: (lessonId: number, studentId: number) => void;
    removePass: (lessonId: number, studentId: number) => void;
    isLoading: boolean;
};

function GroupPassesTable({
    students,
    schedule,
    passes,
    addPass,
    removePass,
    isLoading,
}: Props) {
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
                                    <Checkbox
                                        checked={
                                            passes.findIndex(
                                                (pass) =>
                                                    pass.lesson.id ==
                                                        Number.parseInt(
                                                            column.id
                                                        ) &&
                                                    pass.student.id ==
                                                        cell.getValue<StudentType>()
                                                            .id
                                            ) != -1
                                        }
                                        onChange={async (event) => {
                                            event.target.checked
                                                ? addPass(
                                                      Number.parseInt(
                                                          column.id
                                                      ),
                                                      cell.getValue<StudentType>()
                                                          .id
                                                  )
                                                : removePass(
                                                      Number.parseInt(
                                                          column.id
                                                      ),
                                                      cell.getValue<StudentType>()
                                                          .id
                                                  );
                                        }}
                                    />
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
                        {getStudentFullName(cell.getValue<StudentType>())}
                    </Typography>
                ),
            },
            ...lessonsColumns,
        ];
    }, [students, schedule, passes]);

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

export default GroupPassesTable;
