import { ICourse } from './ICourse';
import { ITeacher } from './ITeacher';

export interface ISubject {
    id: number;
    course: ICourse;
    teacher: ITeacher;
    type: {
        name: string;
    };
}
