import { useMutation, useQuery } from '@apollo/client';
import {
    CREATE_COURSE,
    GET_ALL_COURSES,
    ICourse,
    IFetchAllCourses,
    REMOVE_COURSE,
    UPDATE_COURSE,
} from '../../core/services/adminCourses.service';
import MainContentContainer from '../../components/main/ContentContainer/MainContentContainer';
import CoursesTable from '../../components/courses/CoursesTable';

type Props = {};

function Courses({}: Props) {
    const {
        data: coursesData,
        loading: coursesLoading,
        error: coursesError,
        refetch: coursesRefetch,
    } = useQuery<IFetchAllCourses>(GET_ALL_COURSES, {
        fetchPolicy: 'cache-and-network',
    });

    const [createCourse] = useMutation(CREATE_COURSE);
    const [updateCourse] = useMutation(UPDATE_COURSE);
    const [removeCourse] = useMutation(REMOVE_COURSE);

    const createCallback = async (course: Omit<ICourse, 'id'>) => {
        await createCourse({
            variables: {
                name: course.name,
                startDate: course.startDate,
                endDate: course.endDate,
                form: course.form,
            },
        });
        await coursesRefetch();
    };

    const editCallback = async (course: ICourse) => {
        await updateCourse({
            variables: {
                id: course.id,
                name: course.name,
                startDate: course.startDate,
                endDate: course.endDate,
                form: course.form,
            },
        });
        await coursesRefetch();
    };

    const removeCallback = async (courseId: number) => {
        await removeCourse({
            variables: {
                id: courseId,
            },
        });
        await coursesRefetch();
    };

    return (
        <MainContentContainer header='Courses'>
            <CoursesTable
                courses={coursesData?.courses}
                isLoading={coursesLoading}
                createCallback={createCallback}
                editCallback={editCallback}
                removeCallback={removeCallback}
            />
        </MainContentContainer>
    );
}

export default Courses;
