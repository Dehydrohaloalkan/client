import api from '../api';

export const login = async (data: { login: string; password: string }) => {
    console.log('first');
    return await api.post('/auth', data);
};
