import React from "react";
import {
  createAsyncThunk,
  createSlice,
  isAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { User } from "../../types/User";
import { UserReducer } from "../../types/UserReducer";
import { NewUser } from "../../types/NewUser";

const initialState: UserReducer = {
  users: [],
  loading: false,
  error: "",
};

export const fetchAllUsers = createAsyncThunk("fetcAllUsers", async () => {
  try {
    const result = await axios.get<User[]>(
      "https://api.escuelajs.co/api/v1/users"
    );
    return result.data;
  } catch (e) {
    const error = e as AxiosError;
    return error;
  }
});

export const createNewUser = createAsyncThunk(
  "products/createProduct",
  async (user: NewUser) => {
    try {
      const result = await axios.post<User>(
        "https://api.escuelajs.co/api/v1/users/",
        user
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      throw new Error(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    cleanUpUserReducer: (state) => {
      return initialState;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.users = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = "Failed fetch data";
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.error = "Failed create user";
      });
  },
});

const usersReducer = usersSlice.reducer;
export const { cleanUpUserReducer } = usersSlice.actions;
export default usersReducer;
