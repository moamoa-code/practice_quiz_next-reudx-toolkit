import { createSlice } from '@reduxjs/toolkit'

interface StatusState {
  loggedInUser: string | null,
}

const initialState = { 
  loggedInUser: null,
} as StatusState

const infoSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.loggedInUser = action.payload;
    },
    logOut: (state) => {
      state.loggedInUser = null;
    }
  },
})

export const { logIn, logOut } = infoSlice.actions
export default infoSlice.reducer