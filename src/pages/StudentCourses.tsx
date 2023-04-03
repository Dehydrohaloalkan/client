import { useEffect, useState } from 'react';
import CoursesTable from '../components/courses/CoursesTable';
import MainContentContainer from '../components/main/ContentContainer/MainContentContainer';
import { useFetching } from '../core/hooks/useFetching';
import { getCourses } from '../core/services/Course';
import { CourseType } from '../core/types/Courses';

type Props = {};

function StudentCourses({}: Props) {
    const [courses, setCourses] = useState<CourseType[]>([]);

    const [fetchCourses, isLoading, error] = useFetching(async () => {
        const courses = await getCourses();
        setCourses(courses);
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <MainContentContainer header='Courses'>
            <CoursesTable courses={courses} isLoading={isLoading} />
        </MainContentContainer>
    );
}

export default StudentCourses;
