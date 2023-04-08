import { Container, MenuItem } from '@mui/material';
import MaterialReactTable, {
    MRT_ColumnDef,
    MaterialReactTableProps,
} from 'material-react-table';
import { useContext, useMemo } from 'react';
import { updateStudent } from '../../core/services/Group';
import { GroupInfoType, StudentType } from '../../core/types/Group';
import { Context } from '../GlobalContext';

type Props = {
    students: StudentType[];
    groups?: GroupInfoType[];
    editCallback?: Function;
    isLoading: boolean;
    isFor: 'Student' | 'Admin';
};

function GroupTableWithEdit({
    students,
    groups,
    editCallback,
    isLoading,
    isFor,
}: Props) {
    const { user } = useContext(Context);

    const getMenuOptions = (cellValue: string) => {
        if (user?.role === 'groupLeader') {
            return getGroupLeaderMenuOptions(cellValue);
        } else {
            return getDefaultMenuOptions();
        }
    };

    const getGroupLeaderMenuOptions = (cellValue: string) => {
        if (cellValue !== 'Group Leader') {
            return [
                <MenuItem key={'None'} value={'None'}>
                    None
                </MenuItem>,
                <MenuItem key={'Marking'} value={'Marking'}>
                    Marking
                </MenuItem>,
            ];
        } else {
            return (
                <MenuItem key={'Group Leader'} value={'Group Leader'}>
                    Group Leader
                </MenuItem>
            );
        }
    };

    const getDefaultMenuOptions = () => {
        return [
            <MenuItem key={'None'} value={'None'}>
                None
            </MenuItem>,
            <MenuItem key={'Marking'} value={'Marking'}>
                Marking
            </MenuItem>,
            <MenuItem key={'Group Leader'} value={'Group Leader'}>
                Group Leader
            </MenuItem>,
        ];
    };

    const columns = useMemo<MRT_ColumnDef<StudentType>[]>(() => {
        const columns: MRT_ColumnDef<StudentType>[] = [
            {
                id: 'name',
                header: 'Name',
                accessorKey: 'name',
                enableGrouping: false,
                enableEditing: isFor == 'Admin',
            },
            {
                id: 'surName',
                header: 'SurName',
                accessorKey: 'surName',
                enableGrouping: false,
                enableEditing: isFor == 'Admin',
            },
            {
                id: 'patronymic',
                header: 'Patronymic',
                accessorKey: 'patronymic',
                enableGrouping: false,
                enableEditing: isFor == 'Admin',
            },
            {
                id: 'email',
                header: 'Email',
                accessorKey: 'email',
                enableClickToCopy: true,
                enableGrouping: false,
                enableEditing: isFor == 'Admin',
            },
            {
                id: 'subGroup',
                header: 'SubGroup',
                accessorFn: (person) => (person.subGroup ? '2' : '1'),
                editVariant: 'select',
                editSelectOptions: [
                    {
                        text: '1',
                        value: '1',
                    },
                    {
                        text: '2',
                        value: '2',
                    },
                ],

                size: 50,
            },
            {
                id: 'role',
                header: 'Role',
                accessorFn: (person) => {
                    if (person.isGroupLeader) return 'Group Leader';
                    if (person.isMarking) return 'Marking';
                    return 'None';
                },
                muiTableBodyCellEditTextFieldProps: ({ cell }) => {
                    return {
                        select: true,
                        children: getMenuOptions(cell.getValue<string>()),
                    };
                },
            },
        ];

        if (user?.role == 'admin') {
            columns.push({
                id: 'group',
                header: 'group',
                accessorFn: (student) => student.group?.number,
                muiTableBodyCellEditTextFieldProps: {
                    select: true,
                    children: groups?.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                            {group.number}
                        </MenuItem>
                    )),
                },
            });
        }

        return columns;
    }, [students]);

    const handleSaveRowEdits: MaterialReactTableProps<StudentType>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            console.log(
                '🚀 ~ file: GroupTableWithEdit.tsx:143 ~ values:',
                values
            );
            updateStudent({
                ...students[row.index],

                name: values.name,
                surName: values.surName,
                patronymic: values.patronymic,
                email: values.email,
                subGroup: values.subGroup == '2',
                isMarking: values.role == 'Marking',
                isGroupLeader: values.role == 'Group Leader',
                group:
                    user?.role == 'admin'
                        ? {
                              id: groups!.find(
                                  (group) => group.id == values.group
                              )!.id,
                              number: groups!.find(
                                  (group) => group.id == values.group
                              )!.number,
                          }
                        : students[row.index].group,
            });
            editCallback?.();
            exitEditingMode();
        };

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={students}
                enableGrouping
                enableRowNumbers
                enableStickyHeader
                enableStickyFooter
                enableColumnResizing
                editingMode='modal'
                enablePagination={isFor == 'Admin'}
                enableBottomToolbar={isFor == 'Admin'}
                onEditingRowSave={handleSaveRowEdits}
                enableEditing={
                    user?.role == 'groupLeader' || user?.role == 'admin'
                }
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
            />
        </Container>
    );
}

export default GroupTableWithEdit;
