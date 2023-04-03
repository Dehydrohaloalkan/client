import { Box, Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { PassType } from '../../core/types/Passes';

type Props = {
    passes: PassType[];
    isLoading: boolean;
};

function PassesTable({ passes, isLoading }: Props) {
    const allHours = useMemo(() => {
        return passes.reduce((acc, curr) => acc + curr.hours, 0);
    }, [passes]);

    const columns = useMemo<MRT_ColumnDef<PassType>[]>(
        () => [
            {
                header: 'Lesson',
                accessorKey: 'lesson.name',
            },
            {
                header: 'Date',
                accessorFn: (pass) =>
                    pass.lesson.date.toLocaleDateString('ru-RU'),
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
        [passes, allHours]
    );

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={passes}
                enableRowNumbers
                enableStickyFooter
                enableColumnResizing
                enablePagination={false}
                enableBottomToolbar={false}
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

export default PassesTable;
