import { configureStore } from "@reduxjs/toolkit";

import { todoSlice } from "./features/todo/todoSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
