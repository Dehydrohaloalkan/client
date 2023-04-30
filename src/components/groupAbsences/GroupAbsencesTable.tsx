import { Box, Checkbox, Typography } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import {
    IGroupAbsence,
    IGroupScheduleForAbsences,
    IGroupStudent,
} from '../../core/services/groupAbsences.service';

type Props = {
    students?: IGroupStudent[];
    schedule?: IGroupScheduleForAbsences;
    absences?: IGroupAbsence[];
    addAbsence: (lessonId: string, studentId: string) => void;
    removeAbsence: (lessonId: string, studentId: string) => void;
    isLoading: boolean;
};

function GroupAbsencesTable({
    students,
    schedule,
    absences,
    addAbsence,
    removeAbsence,
    isLoading,
}: Props) {
    function getStudentFullName(student: IGroupStudent) {
        return `${student.surname} ${student.name}`;
    }

    const columns = useMemo<MRT_ColumnDef<IGroupStudent>[]>(() => {
        const lessonsColumns: MRT_ColumnDef<IGroupStudent>[] = [];

        schedule?.days.forEach((day) => {
            lessonsColumns.push({
                id: day.date.toISOString(),
                header: day.date.toLocaleDateString('ru-RU'),
                columns: day.lessons.map((lesson) => {
                    return {
                        id: lesson.id,
                        header: `${lesson.subject.course.name}. ${lesson.subject.type.name} ${'\n'} 
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
                                <Checkbox
                                    checked={
                                        absences?.findIndex(
                                            (absence) =>
                                                absence.lessonId == column.id &&
                                                absence.studentId ==
                                                    cell.getValue<IGroupStudent>().studentId
                                        ) != -1
                                    }
                                    onChange={async (event) => {
                                        event.target.checked
                                            ? addAbsence(
                                                  column.id,
                                                  cell.getValue<IGroupStudent>().studentId
                                              )
                                            : removeAbsence(
                                                  column.id,
                                                  cell.getValue<IGroupStudent>().studentId
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
                        {getStudentFullName(cell.getValue<IGroupStudent>())}
                    </Typography>
                ),
            },
            ...lessonsColumns,
        ];
    }, [students, schedule, absences]);

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

export default GroupAbsencesTable;
