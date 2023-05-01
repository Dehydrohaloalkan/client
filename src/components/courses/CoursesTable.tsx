import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Tooltip } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { ICourse } from '../../core/services/adminCourses.service';
import CreateCourseForm from './CreateCourseForm';
import EditCourseForm from './EditCourseForm';
import RemoveCourseForm from './RemoveCourseForm';

type Props = {
    courses?: ICourse[];
    isLoading: boolean;
    editCallback?: Function;
    createCallback?: Function;
    removeCallback?: Function;
};

function CoursesTable({ courses, isLoading, editCallback, createCallback, removeCallback }: Props) {
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState<ICourse>();

    const columns = useMemo<MRT_ColumnDef<ICourse>[]>(() => {
        return [
            {
                id: 'name',
                header: 'Name',
                accessorKey: 'name',
                enableGrouping: false,
            },
            {
                id: 'startDate',
                header: 'Start Date',
                accessorFn: (course) => new Date(course.startDate).toLocaleDateString('ru-RU'),
                enableGrouping: false,
            },
            {
                id: 'endDate',
                header: 'End Date',
                accessorFn: (course) => new Date(course.endDate).toLocaleDateString('ru-RU'),
                enableGrouping: false,
            },
            {
                id: 'form',
                header: 'Form',
                accessorKey: 'form',
            },
        ];
    }, []);

    const actions = ({ row }: any) => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            }}
        >
            <Tooltip arrow placement='left' title='Edit'>
                <IconButton
                    color='info'
                    onClick={() => {
                        setEditOpen(true);
                        setSelectedCourse(row.original);
                    }}
                >
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='Delete'>
                <IconButton
                    color='error'
                    onClick={() => {
                        setRemoveOpen(true);
                        setSelectedCourse(row.original);
                    }}
                >
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    );

    const onConfirmEdit = async (newCourse: ICourse) => {
        await editCallback?.(newCourse);
        setEditOpen(false);
    };

    const onConfirmCreate = async (newCourse: Omit<ICourse, 'id'>) => {
        await createCallback?.(newCourse);
        setCreateOpen(false);
    };

    const onConfirmRemove = async (courseId: string) => {
        await removeCallback?.(courseId);
        setRemoveOpen(false);
    };

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={courses ?? []}
                enableRowNumbers
                enableGrouping
                enableStickyHeader
                enableStickyFooter
                enableColumnResizing
                initialState={{
                    density: 'comfortable',
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
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: 'center',
                        },
                    },
                }}
                enableEditing
                renderRowActions={actions}
                renderTopToolbarCustomActions={() => (
                    <Button color='info' onClick={() => setCreateOpen(true)} variant='text'>
                        Create New Course
                    </Button>
                )}
            />
            <CreateCourseForm
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onConfirm={onConfirmCreate}
            />
            <EditCourseForm
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onConfirm={onConfirmEdit}
                course={selectedCourse}
            />
            <RemoveCourseForm
                open={removeOpen}
                onClose={() => setRemoveOpen(false)}
                onConfirm={onConfirmRemove}
                course={selectedCourse}
            />
        </Container>
    );
}

export default CoursesTable;
