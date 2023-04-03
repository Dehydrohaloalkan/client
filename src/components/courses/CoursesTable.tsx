import { Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { CourseType } from '../../core/types/Courses';

type Props = {
    courses: CourseType[];
    isLoading: boolean;
};

function CoursesTable({ courses, isLoading }: Props) {
    const columns = useMemo<MRT_ColumnDef<CourseType>[]>(
        () => [
            {
                header: 'Type',
                accessorKey: 'type',
            },
            {
                header: 'Title',
                accessorKey: 'title',
            },
            {
                header: 'Teacher',
                accessorKey: 'teacher',
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
        [courses]
    );

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={courses}
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

export default CoursesTable;
