import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { API_URL } from '../http/api';
import { IAuthUser } from '../models';
import { IAuthResponse } from '../models/auth/IAuthResponse';
import { AuthService } from '../services';

export default class Store {
    user = {} as IAuthUser;
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IAuthUser) {
        this.user = user;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IAuthUser);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.post<IAuthResponse>(`${API_URL}/auth/refresh`, null, {
                withCredentials: true,
            });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }
}
