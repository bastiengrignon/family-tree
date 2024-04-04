import { createSlice } from '@reduxjs/toolkit';

import initialState from './initialState';

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setTrees: (state, { payload }) => ({
      ...state,
      trees: payload.trees,
    }),
    setTree: (state, { payload }) => ({
      ...state,
      currentTree: payload,
    }),
    updateCurrentTreeCode: (state, { payload }) => ({
      ...state,
      currentTree: {
        ...state.currentTree,
        code: payload.code,
      },
    }),
  },
});

export default treeSlice.reducer;
