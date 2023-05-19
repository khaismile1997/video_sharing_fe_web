import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { beApi } from "services/beAPI";
import { beService } from "services/beService";
import { getAccessToken } from "services/utils";

/**
 * Interface & Utility
 */

export type UserState = {
  email: string;
  session_token: string;
};

/**
 * Store constructor
 */

const NAME = "user";
export const initialState: UserState = {
  session_token: "",
  email: "",
};

export const login = createAsyncThunk<
  UserState,
  { email: string; password: string },
  { state: any }
>(`${NAME}/login`, async ({ email, password }, { getState }) => {
  const { data, err } = await beService.login(email, password);
  if (err) throw new Error(err?.message || "Unknown");
  beApi.defaults.headers["Authorization"] = `Bearer ${data.session_token}`;

  localStorage.setItem("session_token", data.session_token);

  return {
    session_token: data.session_token,
    email: data.email,
  };
});

export const signup = createAsyncThunk<
  UserState,
  { username: string; email: string; password: string },
  { state: any }
>(`${NAME}/signup`, async ({ username, email, password }, { getState }) => {
  const { user } = getState();
  const { err } = await beService.signup(username, email, password);
  if (err) throw new Error("Signup is invalid");

  return user;
});

export const logout = createAsyncThunk<UserState, {}, { state: any }>(
  `${NAME}/logout`,
  async () => {
    const { err } = await beService.logout();
    if (err) throw new Error(err.message);
    localStorage.removeItem("session_token");

    return initialState;
  }
);

export const reLogin = createAsyncThunk<UserState, void, { state: any }>(
  `${NAME}/reLogin`,
  async (_, { getState }) => {
    const oldSessionToken = getAccessToken();
    if (!oldSessionToken) return;
    beApi.defaults.headers["Authorization"] = `Bearer ${oldSessionToken}`;
    const { user } = getState();

    const {
      data: { email, session_token },
      err,
    } = await beService.login();
    if (err) throw new Error(err.message);
    return { ...user,session_token, email };
  }
);

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        login.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        signup.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        reLogin.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        logout.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      ),
});

export default slice.reducer;
