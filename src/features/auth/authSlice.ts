import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  type: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signedIn: boolean;
}

const storedUser = localStorage.getItem('user');
const storedSignedIn = localStorage.getItem('signedIn');

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: null,
  signedIn: storedSignedIn ? JSON.parse(storedSignedIn) : false,
};

// Redux slice for auth state
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('user');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSignedIn: (state, action: PayloadAction<boolean>) => {
      state.signedIn = action.payload;
      localStorage.setItem('signedIn', JSON.stringify(action.payload));
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  extraReducers: (builder) => {},
});

export const { setUser, setLoading, setError, setSignedIn } = authSlice.actions;

export default authSlice.reducer;
