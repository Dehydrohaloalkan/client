import { Box, Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { GradeType } from '../../core/types/Grades';

type Props = {
    grades: GradeType[];
    isLoading: boolean;
};

function GradesTable({ grades, isLoading }: Props) {
    const averageGrade = useMemo(() => {
        return grades.reduce((acc, curr) => acc + curr.grade, 0) / grades.length;
    }, [grades]);

    const columns = useMemo<MRT_ColumnDef<GradeType>[]>(
        () => [
            {
                header: 'Lesson',
                accessorKey: 'lesson.name',
            },
            {
                header: 'Date',
                accessorFn: (grade) => grade.lesson.date.toLocaleDateString('ru-RU'),
                enableGrouping: false,
            },
            {
                header: 'Grade',
                accessorKey: 'grade',
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
                data={grades}
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
                    grouping: ['lesson.name'],
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
