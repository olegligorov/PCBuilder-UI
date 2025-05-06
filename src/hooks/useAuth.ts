import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser, setLoading, setError } from '@/features/auth/authSlice';
import { signup, login, fetchMe, logout } from '@/api/auth';

export const useSignup = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: signup,
        onMutate: () => {
            console.log("Here1")
            dispatch(setLoading(true));
            dispatch(setError(null));
        },
        onSuccess: (data) => {
            dispatch(setUser(data.user))
            dispatch(setLoading(false));
        },
        onError: (error: Error) => {
            dispatch(setError(error.message || 'Signul failed'));
            dispatch(setLoading(false));
        }
    })
}

export const useLogin = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: login,
        onMutate: () => {
            console.log("Here2")
            dispatch(setLoading(true));
            dispatch(setError(null));
        },
        onSuccess: (data) => {
            dispatch(setUser(data.user));
            dispatch(setLoading(false));
        },
        onError: (error: any) => {
            dispatch(setError(error.response?.data?.message || 'Login failed'));
            dispatch(setLoading(false));
        },
    });
};


export const useFetchMe = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        retry: false
    });
};

// Hook for Logout
export const useLogout = () => {
    const dispatch = useDispatch();
    return useMutation({
        mutationFn: logout,
        onMutate: () => {
            console.log("Here3")
            dispatch(setLoading(true));
            dispatch(setError(null));
        },
        onSuccess: () => {
            dispatch(setUser(null));
            dispatch(setLoading(false));
        },
        onError: (error: any) => {
            dispatch(setError(error.response?.data?.message || 'Logout failed'));
            dispatch(setLoading(false));
        },
    });
};
