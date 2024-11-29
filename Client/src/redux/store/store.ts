import { configureStore } from "@reduxjs/toolkit";
import announcementReducer from "../reducers/Annoncements/announcementSlice";
import quizReducer from "../reducers//Quizzes/quizSlice";

const store = configureStore({
  reducer: {
    announcement: announcementReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
