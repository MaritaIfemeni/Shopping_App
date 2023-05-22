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
import { UserCredential } from "../../types/UserCredentials";

const initialState: UserReducer = {
  users: [],
  currentUser: null,
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
  "products/createNewUser",
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

export const authenticate = createAsyncThunk(
  "authenticate",
  async (access_token: string) => {
    try {
      const authentication = await axios.get<User>(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const user: User = authentication.data;
      user.isAdmin = user.role === "admin";

      return authentication.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: UserCredential, { dispatch }) => {
    try {
      const result = await axios.post<{ access_token: string }>(
        "https://api.escuelajs.co/api/v1/auth/login",
        { email, password }
      );
      localStorage.setItem("token", result.data.access_token);
      const authentication = await dispatch(
        authenticate(result.data.access_token)
      );
      return authentication.payload as User;
    } catch (e) {
      const error = e as AxiosError;
      return error;
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
    logout: (state) => {
      state.currentUser = null;
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
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.currentUser = action.payload;
          state.loading = false;
        }
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = "Failed login";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        } else {
          state.currentUser = action.payload;
        }
        state.loading = false;
      })
      .addCase(authenticate.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.error = "Failed authentication";
      });
  },
});

const usersReducer = usersSlice.reducer;
export const { cleanUpUserReducer, logout } = usersSlice.actions;
export default usersReducer;
