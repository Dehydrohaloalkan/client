import { PassType } from '../types/Passes';

const passes: PassType[] = [
    {
        lesson: {
            id: 1,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 1,
        },
        hours: 2,
    },
    {
        lesson: {
            id: 3,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: 2,
        },
        hours: 2,
    },
];

export const getPasses = async (): Promise<PassType[]> => {
    return passes;
};

export const addPass = async (
    lessonId: number,
    studentId: number
): Promise<void> => {
    passes.push({
        lesson: {
            id: lessonId,
            name: 'Матеша',
            date: new Date('01.02.2020'),
        },
        student: {
            id: studentId,
        },
        hours: 2,
    });
};

export const removePass = async (lessonId: number, studentId: number) => {
    passes.splice(
        passes.findIndex(
            (pass) => pass.student.id == studentId && pass.lesson.id == lessonId
        ),
        1
    );
};
