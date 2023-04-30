import { Typography } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useContext, useMemo } from 'react';
import { Role } from '../../core/models/auth/Role';
import { ILesson } from '../../core/services/studentSchedule.service';
import { Context } from '../GlobalContext';

const dateToWeekDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
};

type Props = {
    day: {
        date: Date;
        lessons: ILesson[];
    };
    isLoading: boolean;
};

function ScheduleTable({ day, isLoading }: Props) {
    const { store } = useContext(Context);

    const columns = useMemo<MRT_ColumnDef<ILesson>[]>(() => {
        const columns: MRT_ColumnDef<ILesson>[] = [
            {
                header: 'Start Time',
                accessorFn: (item) =>
                    new Date(item.startTime).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                size: 50,
            },
            {
                header: 'End Time',
                accessorFn: (item) =>
                    new Date(item.endTime).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                size: 50,
            },
            {
                header: 'Lesson',
                accessorFn: (lesson) =>
                    `${lesson.subject.course.name}. ${lesson.subject.type.name}`,
            },
            {
                header: 'Location',
                accessorKey: 'location',
                size: 50,
            },
        ];

        if (store.user.role == Role.teacher) {
            columns.push({
                header: 'Groups',
                accessorFn: (lesson) =>
                    lesson.subject.groups?.map((group) => group.number).join(', '),
                size: 70,
            });
        }

        return columns;
    }, []);

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
