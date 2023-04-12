import { Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useContext, useMemo } from 'react';
import { IGroup, IStudent } from '../../core/models';
import { Context } from '../GlobalContext';

type Props = {
    group?: IGroup;
    //students: StudentType[];
    //groups?: GroupInfoType[];
    //editCallback?: Function;
    isLoading: boolean;
};

function GroupTable({ group, isLoading }: Props) {
    const { store } = useContext(Context);

    // const getMenuOptions = (cellValue: string) => {
    //     if (store.user.role === 'groupLeader') {
    //         return getGroupLeaderMenuOptions(cellValue);
    //     } else {
    //         return getDefaultMenuOptions();
    //     }
    // };

    // const getGroupLeaderMenuOptions = (cellValue: string) => {
    //     if (cellValue !== 'Group Leader') {
    //         return [
    //             <MenuItem key={'None'} value={'None'}>
    //                 None
    //             </MenuItem>,
    //             <MenuItem key={'Marking'} value={'Marking'}>
    //                 Marking
    //             </MenuItem>,
    //         ];
    //     } else {
    //         return (
    //             <MenuItem key={'Group Leader'} value={'Group Leader'}>
    //                 Group Leader
    //             </MenuItem>
    //         );
    //     }
    // };

    // const getDefaultMenuOptions = () => {
    //     return [
    //         <MenuItem key={'None'} value={'None'}>
    //             None
    //         </MenuItem>,
    //         <MenuItem key={'Marking'} value={'Marking'}>
    //             Marking
    //         </MenuItem>,
    //         <MenuItem key={'Group Leader'} value={'Group Leader'}>
    //             Group Leader
    //         </MenuItem>,
    //     ];
    // };

    const columns = useMemo<MRT_ColumnDef<IStudent>[]>(() => {
        const columns: MRT_ColumnDef<IStudent>[] = [
            {
                id: 'name',
                header: 'Name',
                accessorKey: 'user.name',
                enableGrouping: false,
            },
            {
                id: 'surname',
                header: 'Surname',
                accessorKey: 'user.surname',
                enableGrouping: false,
            },
            {
                id: 'patronymic',
                header: 'Patronymic',
                accessorKey: 'user.patronymic',
                enableGrouping: false,
            },
            {
                id: 'email',
                header: 'Email',
                accessorKey: 'user.email',
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
                    if (student.is_group_leader) return 'Group Leader';
                    if (student.is_marking) return 'Marking';
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

    // const handleSaveRowEdits: MaterialReactTableProps<StudentType>['onEditingRowSave'] = async ({
    //     exitEditingMode,
    //     row,
    //     values,
    // }) => {
    //     console.log('🚀 ~ file: GroupTableWithEdit.tsx:143 ~ values:', values);
    //     updateStudent({
    //         ...students[row.index],

    //         name: values.name,
    //         surName: values.surName,
    //         patronymic: values.patronymic,
    //         email: values.email,
    //         subGroup: values.subGroup == '2',
    //         isMarking: values.role == 'Marking',
    //         isGroupLeader: values.role == 'Group Leader',
    //         group:
    //             store.user.role == 'admin'
    //                 ? {
    //                       id: groups!.find((group) => group.id == values.group)!.id,
    //                       number: groups!.find((group) => group.id == values.group)!.number,
    //                   }
    //                 : students[row.index].group,
    //     });
    //     editCallback?.();
    //     exitEditingMode();
    // };

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={group?.students ? group?.students : []}
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
            />
        </Container>
    );
}

export default GroupTable;
