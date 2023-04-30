import { Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { IStudentSubject } from '../../core/services/studentSubjects.service';

type Props = {
    subjects?: IStudentSubject[];
    isLoading: boolean;
};

function SubjectsTable({ subjects, isLoading }: Props) {
    const columns = useMemo<MRT_ColumnDef<IStudentSubject>[]>(
        () => [
            {
                header: 'Type',
                accessorKey: 'type.name',
            },
            {
                header: 'Name',
                accessorKey: 'course.name',
            },
            {
                header: 'Teacher',
                accessorFn: (item) => `${item.teacher.name} ${item.teacher.surname}`,
            },
            {
                header: 'Start date',
                accessorFn: (item) => new Date(item.course.startDate).toLocaleDateString('ru-RU'),
            },
            {
                header: 'End date',
                accessorFn: (item) => new Date(item.course.endDate).toLocaleDateString('ru-RU'),
            },
        ],
        []
    );

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={subjects ?? []}
                enableRowNumbers
                enableColumnResizing
                enablePagination={false}
                enableBottomToolbar={false}
                localization={{
                    noRecordsToDisplay: 'No subjects',
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

export default SubjectsTable;
