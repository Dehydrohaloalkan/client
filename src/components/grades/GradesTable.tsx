import { Box, Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { IStudentGrade } from '../../core/services/studentGrades.service';

type Props = {
    grades: IStudentGrade[];
    isLoading: boolean;
};

function GradesTable({ grades, isLoading }: Props) {
    const averageGrade = useMemo(() => {
        if (grades) {
            return grades.reduce((acc, curr) => acc + curr.value, 0) / grades.length;
        }
        return 0;
    }, [grades]);

    const columns = useMemo<MRT_ColumnDef<IStudentGrade>[]>(
        () => [
            {
                id: 'lesson',
                header: 'Lesson',
                accessorFn: (absence) =>
                    `${absence.lesson.subject.course.name}. ${absence.lesson.subject.type.name}`,
            },
            {
                header: 'Date',
                accessorFn: (grade) => new Date(grade.lesson.startTime).toLocaleDateString('ru-RU'),
                enableGrouping: false,
            },
            {
                header: 'Grade',
                accessorKey: 'value',
                aggregationFn: 'mean',
                AggregatedCell: ({ cell, table }) => (
                    <>
                        Average grade
                        <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
                            {cell.getValue<number>().toLocaleString?.('en-US', {
                                maximumFractionDigits: 3,
                            })}
                        </Box>
                    </>
                ),
                Footer: () => (
                    <>
                        Average grade
                        <Box sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                            {averageGrade
                                ? averageGrade.toLocaleString?.('en-US', {
                                      maximumFractionDigits: 3,
                                  })
                                : '0'}
                        </Box>
                    </>
                ),
            },
        ],
        [averageGrade]
    );

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={grades ?? []}
                enableColumnResizing
                enableStickyHeader
                enableStickyFooter
                enableGrouping
                enablePagination={false}
                enableBottomToolbar={false}
                localization={{
                    noRecordsToDisplay: 'No grades',
                }}
                initialState={{
                    grouping: ['lesson'],
                    expanded: true,
                    isLoading: true,
                }}
                state={{
                    isLoading: isLoading,
                }}
                defaultColumn={{
                    minSize: 50,
                    maxSize: 500,
                    size: 100,
                }}
                muiTableContainerProps={{
                    sx: { maxHeight: '100%' },
                }}
            />
        </Container>
    );
}

export default GradesTable;
