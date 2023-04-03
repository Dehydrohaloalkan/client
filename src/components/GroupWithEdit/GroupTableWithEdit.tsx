import { Container, MenuItem } from '@mui/material';
import MaterialReactTable, {
    MRT_ColumnDef,
    MaterialReactTableProps,
} from 'material-react-table';
import { useContext, useMemo } from 'react';
import { setIsMarking, setSubGroup } from '../../core/services/Group';
import { PersonType } from '../../core/types/Group';
import { Context } from '../GlobalContext';

type Props = {
    persons: PersonType[];
    editCallback: Function;
    isLoading: boolean;
};

function GroupTableWithEdit({ persons, editCallback, isLoading }: Props) {
    const { user } = useContext(Context);

    const columns = useMemo<MRT_ColumnDef<PersonType>[]>(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                enableGrouping: false,
                enableEditing: false,
            },
            {
                header: 'SurName',
                accessorKey: 'surName',
                enableGrouping: false,
                enableEditing: false,
            },
            {
                header: 'Patronymic',
                accessorKey: 'patronymic',
                enableGrouping: false,
                enableEditing: false,
            },
            {
                header: 'Email',
                accessorKey: 'email',
                enableClickToCopy: true,
                enableGrouping: false,
                enableEditing: false,
            },
            {
                header: 'SubGroup',
                accessorFn: (person) => {
                    if (person.subGroup) return '2';
                    else return '1';
                },
                muiTableBodyCellEditTextFieldProps: {
                    select: true,
                    children: [1, 2].map((subGroup) => (
                        <MenuItem key={subGroup} value={subGroup}>
                            {subGroup}
                        </MenuItem>
                    )),
                },
                size: 50,
            },
            {
                header: 'Role',
                accessorFn: (person) => {
                    if (person.isGroupLeader) return 'Group Leader';
                    if (person.isMarking) return 'Marking';
                    return 'None';
                },
                muiTableBodyCellEditTextFieldProps: ({ cell }) => {
                    return {
                        select: true,
                        children: ['None', 'Marking'].map(
                            (role) =>
                                cell.getValue() != 'Group Leader' && (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                )
                        ),
                    };
                },
            },
        ],
        [persons]
    );

    const handleSaveRowEdits: MaterialReactTableProps<PersonType>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            setIsMarking(persons[row.index].id, values.Role == 'Marking');
            setSubGroup(persons[row.index].id, values.SubGroup == '2');
            editCallback();
            exitEditingMode();
        };

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={persons}
                enableEditing={user?.role == 'GroupLeader'}
                enableGrouping
                enableRowNumbers
                enableStickyHeader
                enableStickyFooter
                enableColumnResizing
                enablePagination={false}
                enableBottomToolbar={false}
                onEditingRowSave={handleSaveRowEdits}
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
                muiTableContainerProps={{
                    sx: { maxHeight: '100%' },
                }}
            />
        </Container>
    );
}

export default GroupTableWithEdit;
