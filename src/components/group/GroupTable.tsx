import { Delete, Edit } from '@mui/icons-material';
import { Box, Container, IconButton, Tooltip } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useContext, useMemo, useState } from 'react';
import { Role } from '../../core/models/auth/Role';
import { IStudent, IStudentGroup } from '../../core/services/studentGroup.service';
import { Context } from '../GlobalContext';
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
    group?: IStudentGroup;
    editCallback?: Function;
    isLoading: boolean;
};

function GroupTable({ group, isLoading, editCallback }: Props) {
    const { store } = useContext(Context);

    const [editOpen, setEditOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState<IStudent>();

    const students = useMemo(() => Array.from(group?.students ?? []), [group?.students]);

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

        // if (store.user.role == 'admin') {
        //     columns.push({
        //         id: 'group',
        //         header: 'group',
        //         accessorFn: (student) => student.group?.number,
        //         muiTableBodyCellEditTextFieldProps: {
        //             select: true,
        //             children: groups?.map((group) => (
        //                 <MenuItem key={group.id} value={group.id}>
        //                     {group.number}
        //                 </MenuItem>
        //             )),
        //         },
        //     });
        // }

        return columns;
    }, []);

    const leaderActions = ({ row, table, cell }: any) => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Tooltip arrow placement='left' title='Edit'>
                <IconButton
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

    // TODO
    const adminActions = ({ row, table }: any) => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            }}
        >
            <Tooltip arrow placement='left' title='Edit'>
                <IconButton>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='Delete'>
                <IconButton color='error'>
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    );

    const onConfirmEdit = (newStudent: IStudent) => {
        editCallback?.(newStudent);
        setEditOpen(false);
    };

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={students.sort(sortStudents)}
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
            />
            <StudentEditForm
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onConfirm={onConfirmEdit}
                student={selectedStudent}
            />
        </Container>
    );
}

export default GroupTable;
