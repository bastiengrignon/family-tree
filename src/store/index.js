import { configureStore } from '@reduxjs/toolkit';

import treeReducer from './tree';
import userReducer from './user';

const store = configureStore({
  reducer: {
    user: userReducer,
    tree: treeReducer,
  },
});

export default store;
