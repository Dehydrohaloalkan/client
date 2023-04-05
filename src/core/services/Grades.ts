import { GradeType } from '../types/Grades';

const grades: GradeType[] = [
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        grade: 8,
    },
];

export const getGrades = async (): Promise<GradeType[]> => {
    return grades;
};

export const addGrade = async (
    lessonId: number,
    studentId: number,
    grade: number
): Promise<void> => {
    grades.push({
        lesson: {
            id: lessonId,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: studentId,
        },
        grade: grade,
    });
};

export const removeGrade = async (lessonId: number, studentId: number) => {
    grades.splice(
        grades.findIndex(
            (grade) =>
                grade.student.id == studentId && grade.lesson.id == lessonId
        ),
        1
    );
};
