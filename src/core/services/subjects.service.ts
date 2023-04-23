import api from '../http/api';
import { ISubject } from '../models';

export class SubjectsService {
    static async getStudentSubjects() {
        return (await api.get<ISubject[]>('/subjects/info')).data;
    }
}
