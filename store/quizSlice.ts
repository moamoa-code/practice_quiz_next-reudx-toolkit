import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Quiz from '../interface/quiz';

interface QuizState {
  quizzes: Quiz[]
}

const initialState = { 
  quizzes: []
} as QuizState

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    addQuize: (state, action) => {
      const quiz = action.payload;
      state.quizzes = [...state.quizzes, quiz]
    },
    // hitQuiz: (state, action) => {
    //   let quizzes = [...state.quizzes];
    //   // 아이디 중복일경우 삽입하지 않음.
    //   if (quizzes[action.payload.quizIdx].hitUsers.indexOf(action.payload.userId) === -1){
    //     quizzes[action.payload.quizIdx].hitUsers.push(action.payload.userId);
    //   }
    //   state.quizzes = [...quizzes];
    // },
    // missQuiz: (state, action) => {
    //   let quizzes = [...state.quizzes];
    //   // 중복 삽입 (틀린 횟수 카운트)
    //   quizzes[action.payload.quizIdx].missUsers.push(action.payload.userId);
    //   state.quizzes = [...quizzes];
    // }
  },
})

export const { addQuize } = quizSlice.actions
export default quizSlice.reducer