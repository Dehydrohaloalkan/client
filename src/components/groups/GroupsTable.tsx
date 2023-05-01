import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Tooltip } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { IGroup } from '../../core/services/adminGroups.service';
import CreateGroupForm from './CreateGroupForm';
import EditGroupForm from './EditGroupForm';
import RemoveGroupForm from './RemoveGroupForm';

type Props = {
    groups?: IGroup[];
    isLoading: boolean;
    editCallback?: Function;
    createCallback?: Function;
    removeCallback?: Function;
};

function GroupsTable({ groups, isLoading, editCallback, createCallback, removeCallback }: Props) {
    const [editOpen, setEditOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);

    const [selectedGroup, setSelectedGroup] = useState<IGroup>();

    const columns = useMemo<MRT_ColumnDef<IGroup>[]>(() => {
        return [
            {
                id: 'number',
                header: 'Number',
                accessorKey: 'number',
                enableGrouping: false,
            },
            {
                id: 'form',
                header: 'Form',
                accessorKey: 'form',
            },
            {
                id: 'count',
                header: 'Students in group',
                accessorFn: (group) => group.students?.length,
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
                        setSelectedGroup(row.original);
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
                        setSelectedGroup(row.original);
                    }}
                >
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    );

    const onConfirmEdit = async (newGroup: IGroup) => {
        await editCallback?.(newGroup);
        setEditOpen(false);
    };

    const onConfirmCreate = async (newGroup: Omit<IGroup, 'id'>) => {
        await createCallback?.(newGroup);
        setCreateOpen(false);
    };

    const onConfirmRemove = async (groupId: string) => {
        await removeCallback?.(groupId);
        setRemoveOpen(false);
    };

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={groups ?? []}
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
                        Create New Group
                    </Button>
                )}
            />
            <CreateGroupForm
                open={createOpen}
                onClose={() => setCreateOpen(false)}
                onConfirm={onConfirmCreate}
            />
            <EditGroupForm
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onConfirm={onConfirmEdit}
                group={selectedGroup}
            />
            <RemoveGroupForm
                open={removeOpen}
                onClose={() => setRemoveOpen(false)}
                onConfirm={onConfirmRemove}
                group={selectedGroup}
            />
        </Container>
    );
}

export default GroupsTable;
