import { login, logout, signup } from '@/api/auth';
import { setError, setLoading, setSignedIn } from '@/features/auth/authSlice';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signup,
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (data) => {
      console.log(data);
      const access = data.accessToken;
      const refresh = data.refreshToken;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // setUser(data.user)
      dispatch(setSignedIn(true));
      dispatch(setLoading(false));

      navigate('/');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      dispatch(setError(error.response?.data?.error || error.message || 'Signup failed'));
      dispatch(setLoading(false));
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onMutate: () => {
      console.log('Here2');
      dispatch(setLoading(true));
      dispatch(setError(null));
    },
    onSuccess: (data) => {
      const access = data.accessToken;
      const refresh = data.refreshToken;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // setUser(data.user)
      dispatch(setSignedIn(true));
      dispatch(setLoading(false));

      navigate('/');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      dispatch(setError(error.response?.data?.error || error.message || 'Signup failed'));
      dispatch(setLoading(false));
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: logout,
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      // dispatch(setUser(null));
      dispatch(setSignedIn(false));
      dispatch(setLoading(false));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      dispatch(setError(error.response?.data?.message || 'Logout failed'));
      dispatch(setLoading(false));
    },
  });
};
