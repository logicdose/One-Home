import { createSlice } from "@reduxjs/toolkit";

interface EditState {
  editMode: boolean;
}

const initialState: EditState = {
  editMode: false,
};

export const editState = createSlice({
  name: "editState",
  initialState,
  reducers: {
    setEditMode: (state, action) => {
      state.editMode = action.payload;
    },
  },
});

export const { setEditMode } = editState.actions;
export default editState.reducer;
