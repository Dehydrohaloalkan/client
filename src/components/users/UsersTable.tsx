import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Tooltip } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { IUser } from '../../core/services/adminUsers.service';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';
import RemoveUserForm from './RemoveUserForm';

type Props = {
    users?: IUser[];
    isLoading: boolean;
    editCallback?: Function;
    createCallback?: Function;
    removeCallback?: Function;
};

function UsersTable({ users, isLoading, editCallback, createCallback, removeCallback }: Props) {
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState<IUser>();

    const columns = useMemo<MRT_ColumnDef<IUser>[]>(() => {
        return [
            {
                id: 'surname',
                header: 'Surname',
                accessorKey: 'surname',
            },
            {
                id: 'name',
                header: 'Name',
                accessorKey: 'name',
            },
            {
                id: 'patronymic',
                header: 'Patronymic',
                accessorKey: 'patronymic',
            },
            {
                id: 'email',
                header: 'Email',
                accessorKey: 'email',
                enableClickToCopy: true,
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
                        setSelectedUser(row.original);
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
                        setSelectedUser(row.original);
                    }}
                >
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    );

    const onConfirmEdit = async (newStudent: IUser) => {
        await editCallback?.(newStudent);
        setEditOpen(false);
    };

    const onConfirmCreate = async (newStudent: Omit<IUser, 'id'>) => {
        await createCallback?.(newStudent);
        setCreateOpen(false);
    };

    const onConfirmRemove = async (id: string) => {
        await removeCallback?.(id);
        setRemoveOpen(false);
    };

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={users ?? []}
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
                enableEditing
                renderRowActions={actions}
                renderTopToolbarCustomActions={() => (
                    <Button color='info' onClick={() => setCreateOpen(true)} variant='text'>
                        Create New User
                    </Button>
                )}
            />
            <CreateUserForm
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onConfirm={onConfirmCreate}
            />
            <EditUserForm
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onConfirm={onConfirmEdit}
                user={selectedUser}
            />
            <RemoveUserForm
                open={removeOpen}
                onClose={() => setRemoveOpen(false)}
                onConfirm={onConfirmRemove}
                user={selectedUser}
            />
        </Container>
    );
}

export default UsersTable;
