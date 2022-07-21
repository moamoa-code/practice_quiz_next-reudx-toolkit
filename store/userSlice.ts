import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import User from '../interface/user';
import HitQuiz from '../interface/hitQuiz';

interface UserState {
  users: User[]
}

const initialState = { 
  users: []
} as UserState

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      state.users = [...state.users, user]
    },
    initUsers: (state, action) => {
      state.users = action.payload;
    },
    hitQuiz: (state, action) => {
      console.log(action.payload);
      let users = [...state.users];
      let hitQuiz:HitQuiz = {
        // quizIdx: Number(action.payload.quizIdx),
        quizId: action.payload.quizId,
        try: 1,
        correct: true,
      }
      let userIdx = users.findIndex((user) => user.id === action.payload.userId);
      let hitQuizIdx = users[userIdx].hitQuizzes.findIndex(
        (q:HitQuiz) => q.quizId === action.payload.quizId
        );
      if (hitQuizIdx !== -1) { // 이미 시도한 퀴즈인 경우
        hitQuiz = {
          // quizIdx: action.payload.quizIdx,
          quizId: action.payload.quizId,
          try: users[userIdx].hitQuizzes[hitQuizIdx].try + 1,
          correct: true,
        }
        users[userIdx].hitQuizzes[hitQuizIdx] = hitQuiz;
      } else {
        users[userIdx].hitQuizzes.push(hitQuiz);
      }
      // 적중률
      let newHit = users[userIdx].hits + 1
      let newTty = users[userIdx].try  + 1;
      users[userIdx].hits = newHit;
      users[userIdx].try = newTty;
      users[userIdx].hitRate = newHit/newTty;
      users.sort(
        (a, b) => (b.hitRate - a.hitRate)
      );
      for(let i = 0; i < users.length; i++){
        users[i].rank = i + 1;
      }
      state.users = [...users];
    },
    missQuiz: (state, action) => {
      console.log(action.payload);
      let users = [...state.users];
      let hitQuiz:HitQuiz = {
        quizId: action.payload.quizId,
        try: 1,
        correct: false,
      }
      let userIdx = users.findIndex((user) => user.id === action.payload.userId);
      let hitQuizIdx = users[userIdx].hitQuizzes.findIndex(
        (q:HitQuiz) => q.quizId === action.payload.quizId
        );
      if (hitQuizIdx !== -1) { // 이미 시도한 퀴즈인 경우
        hitQuiz = {
          quizId: action.payload.quizId,
          try: users[userIdx].hitQuizzes[hitQuizIdx].try + 1,
          correct: false,
        }
        users[userIdx].hitQuizzes[hitQuizIdx] = hitQuiz;
      } else {
        users[userIdx].hitQuizzes.push(hitQuiz);
      }
      // 적중률
      let newTty = users[userIdx].try  + 1;
      users[userIdx].try = users[userIdx].try  + 1;
      users[userIdx].hitRate = users[userIdx].hits/newTty;
      users.sort(
        (a, b) => (b.hitRate - a.hitRate) 
      );
      for(let i = 0; i < users.length; i++){
        users[i].rank = i + 1;
      }
      state.users = [...users];
    }
  },
})

export const { addUser, hitQuiz, missQuiz } = userSlice.actions
export default userSlice.reducer