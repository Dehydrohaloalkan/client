import { AxiosResponse } from 'axios';
import api from '../http/api';
import { IAuthResponse } from '../models';

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>('/auth/login', { email, password });
    }

    static async logout(): Promise<void> {
        return api.post('/auth/logout');
    }
}
