import { GroupType, StudentType } from '../types/Group';

const group: GroupType = {
    id: 1,
    number: '051003',
    students: [
        {
            id: 1,
            name: 'Alex',
            surName: 'Grayrat',
            patronymic: 'Rydeysavich',
            email: 'test@test.com',
            isGroupLeader: true,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 2,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 3,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 4,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 5,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 6,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 7,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 8,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 9,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 10,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 11,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 12,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 13,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 14,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 15,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
        {
            id: 16,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: true,
            subGroup: false,
        },
        {
            id: 17,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: true,
        },
        {
            id: 18,
            name: 'Stud',
            surName: 'Stud',
            patronymic: 'Stud',
            email: 'test@test.com',
            isGroupLeader: false,
            isMarking: false,
            subGroup: false,
        },
    ],
};

export const getGroup = async (): Promise<GroupType> => {
    return group;
};

export const setIsMarking = async (id: number, newValue: boolean) => {
    group.students[
        group.students.findIndex((student) => student.id === id)
    ].isMarking = newValue;
};

export const setSubGroup = async (id: number, newValue: boolean) => {
    group.students[
        group.students.findIndex((student) => student.id === id)
    ].subGroup = newValue;
};

export const getStudentFullName = (student: StudentType) =>
    `${student.name} ${student.surName} ${student.patronymic}`;
