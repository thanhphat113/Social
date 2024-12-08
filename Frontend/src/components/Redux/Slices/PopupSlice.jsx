import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPopupOpen: false,
  popupType: "", // "avatar", "coverPhoto", "groupPost"
  payload: null, // Dữ liệu truyền vào form (nếu có)
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state.isPopupOpen = true;
      state.popupType = action.payload.type; // Loại popup
      state.payload = action.payload.data || null; // Dữ liệu truyền thêm
    },
    closePopup: (state) => {
      state.isPopupOpen = false;
      state.popupType = "";
      state.payload = null;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;
export default popupSlice.reducer;