import { createSlice } from "@reduxjs/toolkit";


const initialState: { isAdmin: boolean } = {
   isAdmin: false,
};

const adminSlice = createSlice({
   name: "admin",
   initialState,
   reducers: {
      adminLogout: (state) => {
         state.isAdmin = false;
      },
      adminLogin: (state) => {
         state.isAdmin = true;
      },
   },
});

export const { adminLogout, adminLogin } = adminSlice.actions;
export default adminSlice.reducer;