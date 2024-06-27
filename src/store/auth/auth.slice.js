import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getToken = createAsyncThunk(
    "auth/getToken",
    async ({ username, password }) => {
      const response = await fetch("https://api.botm.uz/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
    
      const data = await response.json();
      return data.data.token.access_token; 
    }
  );

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: "",
        status: "idle"
    },

    extraReducers: (builder) => {
        builder
          .addCase(getToken.pending, (state) => {
            state.status = "pending";
          })
          .addCase(getToken.fulfilled, (state, {payload}) => {
            state.status = "fulfilled";
            state.token = payload;
          })
          .addCase(getToken.rejected, (state) => {
            state.status = "failed";
          });
      },
})

export default authSlice.reducer;
