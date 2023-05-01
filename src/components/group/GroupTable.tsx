import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Tooltip } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useContext, useMemo, useState } from 'react';
import { Role } from '../../core/models/auth/Role';
import { IStudent } from '../../core/services/studentGroup.service';
import { Context } from '../GlobalContext';
import AdminCreateStudentForm from './AdminCreateStudentForm';
import AdminEditStudentForm from './AdminEditStudentForm';
import AdminRemoveStudentForm from './AdminRemoveStudentForm';
import StudentEditForm from './StudentEditForm';

// function that sort students by surname in IStudentGroup
function sortStudents(a: IStudent, b: IStudent) {
    if (a.surname < b.surname) {
        return -1;
    } else {
        return 1;
    }
}

type Props = {
    students?: IStudent[];
    isLoading: boolean;
    editCallback?: Function;
    createCallback?: Function;
    removeCallback?: Function;
};

function GroupTable({ students, isLoading, editCallback, createCallback, removeCallback }: Props) {
    const { store } = useContext(Context);

    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState<IStudent>();

    const studentsData = useMemo(() => Array.from(students ?? []), [students]);

    const columns = useMemo<MRT_ColumnDef<IStudent>[]>(() => {
        const columns: MRT_ColumnDef<IStudent>[] = [
            {
                id: 'surname',
                header: 'Surname',
                accessorKey: 'surname',
                enableGrouping: false,
            },
            {
                id: 'name',
                header: 'Name',
                accessorKey: 'name',
                enableGrouping: false,
            },
            {
                id: 'patronymic',
                header: 'Patronymic',
                accessorKey: 'patronymic',
                enableGrouping: false,
            },
            {
                id: 'email',
                header: 'Email',
                accessorKey: 'email',
                enableClickToCopy: true,
                enableGrouping: false,
            },
            {
                id: 'subGroup',
                header: 'SubGroup',
                accessorFn: (student) => (student.subgroup ? '2' : '1'),
                size: 50,
            },
            {
                id: 'role',
                header: 'Role',
                accessorFn: (student) => {
                    if (student.isLeader) return 'Leader';
                    if (student.isMarking) return 'Marking';
                    return 'None';
                },
            },
        ];

        if (store.user.role == Role.admin) {
            columns.push({
                id: 'group',
                header: 'group',
                accessorFn: (student) => student.group?.number,
            });
        }

        return columns;
    }, []);

    const leaderActions = ({ row }: any) => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Tooltip arrow placement='left' title='Edit'>
                <IconButton
                    color='info'
                    onClick={() => {
                        setEditOpen(true);
                        setSelectedStudent(row.original);
                    }}
                >
                    <Edit />
                </IconButton>
            </Tooltip>
        </Box>
    );

    const adminActions = ({ row }: any) => (
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
                        setSelectedStudent(row.original);
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
                        setSelectedStudent(row.original);
                    }}
                >
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    );

    const onConfirmEdit = async (newStudent: IStudent) => {
        await editCallback?.(newStudent);
        setEditOpen(false);
    };

    const onConfirmCreate = async (newStudent: IStudent) => {
        await createCallback?.(newStudent);
        setCreateOpen(false);
    };

    const onConfirmRemove = async (studentId: string) => {
        await removeCallback?.(studentId);
        setRemoveOpen(false);
    };

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={studentsData.sort(sortStudents)}
                enableGrouping
                enableRowNumbers
                enableStickyHeader
                enableStickyFooter
                enableColumnResizing
                editingMode='modal'
                initialState={{
                    density: 'compact',
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
                enableEditing={store.user.role == Role.leader || store.user.role == Role.admin}
                renderRowActions={store.user.role == Role.admin ? adminActions : leaderActions}
                renderTopToolbarCustomActions={() => {
                    if (store.user.role == Role.admin)
                        return (
                            <Button color='info' onClick={() => setCreateOpen(true)} variant='text'>
                                Create New Student
                            </Button>
                        );
                }}
            />
            {store.user.role == Role.leader && (
                <StudentEditForm
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    onConfirm={onConfirmEdit}
                    student={selectedStudent}
                />
            )}
            {store.user.role == Role.admin && (
                <>
                    <AdminCreateStudentForm
                        open={createOpen}
                        onClose={() => setCreateOpen(false)}
                        onConfirm={onConfirmCreate}
                    />
                    <AdminEditStudentForm
                        open={editOpen}
                        onClose={() => setEditOpen(false)}
                        onConfirm={onConfirmEdit}
                        student={selectedStudent}
                    />
                    <AdminRemoveStudentForm
                        open={removeOpen}
                        onClose={() => setRemoveOpen(false)}
                        onConfirm={onConfirmRemove}
                        student={selectedStudent}
                    />
                </>
            )}
        </Container>
    );
}

export default GroupTable;
