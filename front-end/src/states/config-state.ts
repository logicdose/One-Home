import { createSlice } from "@reduxjs/toolkit";
import ConfigApi from "../storage/apis/config.api";

export interface ConfigState {
  showSearchImage: boolean;
  contentStyle: "light" | "dark";
}

const initialState: ConfigState = {
  showSearchImage: false,
  contentStyle: "dark",
};

export const configState = createSlice({
  name: "configState",
  initialState,
  reducers: {
    setShowSearchImage: (state, action) => {
      state.showSearchImage = action.payload;

      // Update Config
      ConfigApi.saveConfig(state);
    },
    setContentStyle: (state, action) => {
      state.contentStyle = action.payload;

      // Update Config
      ConfigApi.saveConfig(state);
    },
    loadConfig: (state) => {
      const config = ConfigApi.loadConfig();
      if (config) {
        state.showSearchImage = config.showSearchImage ?? true;
        state.contentStyle = config.contentStyle;
      }
    },
  },
});

export const { setShowSearchImage, setContentStyle, loadConfig } = configState.actions;
export default configState.reducer;
