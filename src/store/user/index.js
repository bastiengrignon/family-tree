import { createSlice } from '@reduxjs/toolkit';

import initialState from '@store/user/initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => ({
      ...state,
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      fullName: payload.fullName,
      avatarUrl: payload.avatarUrl,
    }),
    logoutUser: (state) => ({
      ...state,
      ...initialState,
    }),
  },
});

export default userSlice.reducer;
