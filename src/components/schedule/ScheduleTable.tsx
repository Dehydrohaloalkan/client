import { Typography } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { dateToWeekDay } from '../../core/services/Schedule';
import { LessonType, ScheduleType } from '../../core/types/Schedule';

type Props = {
    day: ScheduleType;
    isLoading: boolean;
    isFor: 'Teacher' | 'Student';
};

function ScheduleTable({ day, isLoading, isFor }: Props) {
    const columns = useMemo<MRT_ColumnDef<LessonType>[]>(() => {
        const columns: MRT_ColumnDef<LessonType>[] = [
            {
                header: 'Start',
                accessorFn: (item) =>
                    item.startTime.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                size: 50,
            },
            {
                header: 'End',
                accessorFn: (item) =>
                    item.endTime.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                size: 50,
            },
            {
                header: 'Title',
                accessorKey: 'subject.name',
            },
            {
                header: 'Location',
                accessorKey: 'location',
                size: 50,
            },
        ];
        if (isFor == 'Student') {
            console.log('first');
            columns.push({
                header: 'Grade',
                accessorKey: 'grade',
                size: 50,
            });
        }
        if (isFor == 'Teacher') {
            columns.push({
                header: 'Group',
                accessorKey: 'group.number',
                size: 50,
            });
        }
        return columns;
    }, [day]);

    return (
        <>
            <Typography variant='h4' component={'p'}>
                {dateToWeekDay(day.date) +
                    '   ' +
                    day.date.toLocaleDateString('ru-RU')}
            </Typography>
            <MaterialReactTable
                columns={columns}
                data={day.lessons}
                enableColumnResizing
                enableTopToolbar={false}
                enableBottomToolbar={false}
                enableColumnActions={false}
                initialState={{
                    isLoading: true,
                }}
                state={{
                    isLoading: isLoading,
                }}
            />
        </>
    );
}

export default ScheduleTable;
