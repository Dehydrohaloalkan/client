import api from '../http/api';
import { IStudentAbsences } from '../models';

export default class AbsencesService {
    static async getStudentAbsences() {
        return (await api.get<IStudentAbsences[]>('/lessons/absences/student')).data;
    }
}
