import { makeAutoObservable } from 'mobx';
import { IAuthUser } from '../models';
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
            localStorage.setItem('token', response.accessToken);
            this.setAuth(true);
            this.setUser(response.user);
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
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.accessToken);
            this.setAuth(true);
            this.setUser(response.user);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }
}
