import { useState } from 'react';

export type FetchType = [fetching: Function, isLoading: boolean, error: string];

export const useFetching = (callback: () => void): FetchType => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};
