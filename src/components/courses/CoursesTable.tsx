import { Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { SubjectType } from '../../core/types/Subject';

type Props = {
    subjects: SubjectType[];
    isLoading: boolean;
};

function SubjectsTable({ subjects, isLoading }: Props) {
    const columns = useMemo<MRT_ColumnDef<SubjectType>[]>(
        () => [
            {
                header: 'Type',
                accessorKey: 'type',
            },
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'Teacher',
                accessorKey: 'teacher.fullName',
            },
            {
                header: 'Start date',
                accessorFn: (item) =>
                    item.startDate.toLocaleDateString('ru-RU'),
            },
            {
                header: 'End date',
                accessorFn: (item) => item.endDate.toLocaleDateString('ru-RU'),
            },
        ],
        [subjects]
    );

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={subjects}
                enableRowNumbers
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

export default SubjectsTable;
