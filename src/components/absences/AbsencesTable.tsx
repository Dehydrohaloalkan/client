import { Box, Container } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { IStudentAbsence } from '../../core/services/studentAbsences.service';

type Props = {
    absences?: IStudentAbsence[];
    isLoading: boolean;
};

function AbsencesTable({ absences, isLoading }: Props) {
    const allHours = useMemo(() => {
        return absences?.reduce((acc, curr) => acc + curr.hours, 0);
    }, [absences]);

    const columns = useMemo<MRT_ColumnDef<IStudentAbsence>[]>(
        () => [
            {
                header: 'Lesson',
                accessorFn: (absence) =>
                    `${absence.lesson.subject.course.name}. ${absence.lesson.subject.type.name}`,
            },
            {
                header: 'Start Time',
                accessorFn: (absence) => new Date(absence.lesson.startTime).toLocaleString('ru-RU'),
            },
            {
                header: 'End Time',
                accessorFn: (absence) => new Date(absence.lesson.endTime).toLocaleString('ru-RU'),
            },
            {
                header: 'Hours',
                accessorKey: 'hours',
                Footer: () => (
                    <>
                        Total hours
                        <Box sx={{ color: 'warning.main', fontWeight: 'bold' }}>{allHours}</Box>
                    </>
                ),
            },
        ],
        [absences]
    );

    return (
        <Container>
            <MaterialReactTable
                columns={columns}
                data={absences ?? []}
                enableRowNumbers
                enableStickyFooter
                enableColumnResizing
                enablePagination={false}
                enableBottomToolbar={false}
                localization={{
                    noRecordsToDisplay: 'No absences',
                }}
                initialState={{
                    density: 'spacious',
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

export default AbsencesTable;
