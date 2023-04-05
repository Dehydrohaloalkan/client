import {
    GroupInfoType,
    GroupType,
    GroupedGroupsType,
    StudentType,
} from '../types/Group';

const group: GroupType = {
    id: 1,
    number: '051003',
    form: 1,
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

const groups: GroupInfoType[] = [
    {
        id: 1,
        number: '051003',
        form: 1,
    },
    {
        id: 2,
        number: '051004',
        form: 1,
    },
    {
        id: 3,
        number: '151003',
        form: 2,
    },
    {
        id: 4,
        number: '151004',
        form: 2,
    },
];

export const getGroup = async (id: number): Promise<GroupType> => {
    //await new Promise((r) => setTimeout(r, 2000));
    return group;
};

export const updateStudent = async (newStudent: StudentType) => {
    group.students[
        group.students.findIndex((student) => student.id === newStudent.id)
    ] = newStudent;
};

export const addStudent = async (newStudent: StudentType) => {
    group.students.push(newStudent);
};

export const getStudentFullName = (student: StudentType) =>
    `${student.name} ${student.surName} ${student.patronymic}`;

export const reduceGroupsByForm = (
    groups: GroupInfoType[]
): GroupedGroupsType => {
    return groups.reduce<GroupedGroupsType>((result, group) => {
        const key = group.form;
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(group);
        return result;
    }, {});
};

export const getGroups = async () => {
    return groups;
};
