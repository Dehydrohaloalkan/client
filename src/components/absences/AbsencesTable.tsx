import { Box, Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { IStudentAbsences } from '../../core/models';

type Props = {
    absences: IStudentAbsences[];
    isLoading: boolean;
};

function AbsencesTable({ absences, isLoading }: Props) {
    const allHours = useMemo(() => {
        return absences.reduce((acc, curr) => acc + curr.hours, 0);
    }, [absences]);

    const columns = useMemo<MRT_ColumnDef<IStudentAbsences>[]>(
        () => [
            {
                header: 'Lesson',
                accessorKey: 'lesson',
            },
            {
                header: 'Date',
                accessorFn: (item) => new Date(item.date).toLocaleDateString('ru-RU'),
            },
            {
                header: 'Hours',
                accessorKey: 'hours',
                Footer: () => (
                    <>
                        Total hours
                        <Box sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                            {allHours.toLocaleString?.('en-US', {
                                maximumFractionDigits: 3,
                            })}
                        </Box>
                    </>
                ),
            },
        ],
        []
    );

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={absences}
                enableRowNumbers
                enableStickyFooter
                enableColumnResizing
                enablePagination={false}
                enableBottomToolbar={false}
                localization={{
                    noRecordsToDisplay: 'No absences',
                }}
                initialState={{
                    density: 'spacious',
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
            />
        </Container>
    );
}

export default AbsencesTable;
