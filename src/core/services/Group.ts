import { PersonType } from '../types/Group';

const persons = [
    {
        id: 1,
        name: 'Alex',
        surName: 'Grayrat',
        patronymic: 'Rydeysavich',
        isGroupLeader: true,
        isMarking: false,
        subGroup: false,
        email: 'test@test.com',
    },
    {
        id: 2,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 3,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 4,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 5,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 6,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 7,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: true,
        subGroup: false,
    },
    {
        id: 8,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: true,
    },
    {
        id: 9,
        name: 'Alex',
        surName: 'Grayrat',
        patronymic: 'Rydeysavich',
        isGroupLeader: false,
        isMarking: true,
        subGroup: false,
        email: 'test@test.com',
    },
    {
        id: 10,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 11,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 12,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 13,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 14,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 15,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: true,
        subGroup: false,
    },
    {
        id: 16,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: true,
    },
    {
        id: 17,
        name: 'Alex',
        surName: 'Grayrat',
        patronymic: 'Rydeysavich',
        isGroupLeader: false,
        isMarking: true,
        subGroup: false,
        email: 'test@test.com',
    },
    {
        id: 18,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 19,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 20,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 21,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 22,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: false,
    },
    {
        id: 23,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: true,
        subGroup: false,
    },
    {
        id: 24,
        name: 'stud',
        surName: 'stud',
        patronymic: 'stud',
        isGroupLeader: false,
        isMarking: false,
        subGroup: true,
    },
];

export const getGroup = async (): Promise<PersonType[]> => {
    return persons;
};

export const setIsMarking = async (id: number, newValue: boolean) => {
    console.log('🚀 ~ file: Group.ts:230 ~ setIsMarking ~ id:', id);
    console.log('🚀 ~ file: Group.ts:230 ~ setIsMarking ~ newValue:', newValue);
    console.log('🚀 ~ file: Group.ts:228 ~ getGroup ~ persons:', persons);

    persons[persons.findIndex((person) => person.id === id)].isMarking =
        newValue;
};

export const setSubGroup = async (id: number, newValue: boolean) => {
    console.log('🚀 ~ file: Group.ts:230 ~ setIsMarking ~ id:', id);
    console.log('🚀 ~ file: Group.ts:230 ~ setIsMarking ~ newValue:', newValue);
    console.log('🚀 ~ file: Group.ts:228 ~ getGroup ~ persons:', persons);

    persons[persons.findIndex((person) => person.id === id)].subGroup =
        newValue;
    console.log('🚀 ~ file: Group.ts:228 ~ getGroup ~ persons:', persons);
};
