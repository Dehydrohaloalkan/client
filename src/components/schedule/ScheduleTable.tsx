import { Typography } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { ILesson } from '../../core/services/studentSchedule.service';

const dateToWeekDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

type Props = {
    day: {
        date: Date;
        lessons: ILesson[];
    };
    isLoading: boolean;
    isFor: 'Teacher' | 'Student';
};

function ScheduleTable({ day, isLoading, isFor }: Props) {
    const columns = useMemo<MRT_ColumnDef<ILesson>[]>(() => {
        const columns: MRT_ColumnDef<ILesson>[] = [
            {
                header: 'Start Time',
                accessorFn: (item) =>
                    new Date(item.startTime).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                size: 80,
            },
            {
                header: 'End Time',
                accessorFn: (item) =>
                    new Date(item.endTime).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                size: 80,
            },
            {
                header: 'Lesson',
                accessorFn: (lesson) =>
                    `${lesson.subject.course.name}. ${lesson.subject.type.name}`,
            },
            {
                header: 'Location',
                accessorKey: 'location',
                size: 80,
            },
        ];
        // if (isFor == 'Student') {
        //     console.log('first');
        //     columns.push({
        //         header: 'Grade',
        //         accessorKey: 'grade',
        //         size: 50,
        //     });
        // }
        // if (isFor == 'Teacher') {
        //     columns.push({
        //         header: 'Group',
        //         accessorFn: (lesson) => lesson.group?.number,
        //         size: 50,
        //     });
        // }
        return columns;
    }, [day]);

    return (
        <>
            <Typography variant='h5' component={'p'}>
                {dateToWeekDay(new Date(day.date)) +
                    '   ' +
                    new Date(day.date).toLocaleDateString('ru-RU')}
            </Typography>
            <MaterialReactTable
                columns={columns}
                data={day.lessons}
                enableColumnResizing
                localization={{
                    noRecordsToDisplay: 'No lessons',
                }}
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
