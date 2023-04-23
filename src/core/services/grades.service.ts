import api from '../http/api';
import { IStudentGrades } from '../models';

export class GradesService {
    static async getStudentAbsences() {
        return (await api.get<IStudentGrades[]>('/lessons/absences/student')).data;
    }
}
