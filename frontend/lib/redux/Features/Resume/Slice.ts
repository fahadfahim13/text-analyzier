import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialState, ResumeState } from './types';

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResume: (state, action: PayloadAction<ResumeState>) => {
      state.aboutMe = action.payload.aboutMe;
      state.achievements = action.payload.achievements;
      state.experiences = action.payload.experiences;
      state.introduction = action.payload.introduction;
      state.projects = action.payload.projects;
      state.skills = action.payload.skills;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setResume } = resumeSlice.actions

export default resumeSlice.reducer