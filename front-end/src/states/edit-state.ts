import { createSlice } from "@reduxjs/toolkit";

interface EditState {
  editMode: boolean;
  appBackground?: string;
}

const initialState: EditState = {
  editMode: false,
  appBackground: undefined,
};

export const editState = createSlice({
  name: "editState",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
    setAppBackground: (state, action) => {
      state.appBackground = action.payload;
    },
  },
});

export const { setEditMode, setAppBackground } = editState.actions;
export default editState.reducer;
