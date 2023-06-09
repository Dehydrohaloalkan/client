import api from '../http/api';
import { IGroup } from '../models';

export class GroupService {
    static async getStudentGroup() {
        return (await api.get<IGroup>('/groups/info')).data;
    }
}
