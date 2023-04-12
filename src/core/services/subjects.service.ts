import api from '../http/api';
import { ISubject } from '../models/subjects/ISubject';

export default class SubjectsService {
    static async getStudentSubjects() {
        return (await api.get<ISubject[]>('/subjects/info')).data;
    }
}
