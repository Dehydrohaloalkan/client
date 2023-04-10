import { IStudent } from './IStudent';

export interface IGroup {
    id: number;
    number: string;
    form: number;
    students?: IStudent[];
}
