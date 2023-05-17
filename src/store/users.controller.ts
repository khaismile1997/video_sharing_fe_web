import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { beApi } from "services/beAPI";

// import { AuthService } from 'services/auth'
// import { getAccessToken } from 'services/utils'
// import { UserService } from 'services/user'
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
  const { data } = await beService.login(email, password);
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
  const { data } = await beService.signup(username, email, password);

  return user;
});

export const logout = createAsyncThunk<UserState, {}, { state: any }>(
  `${NAME}/logout`,
  async () => {
    const { data } = await beService.logout();
    localStorage.removeItem("session_token");

    return initialState;
  }
);

export const reLogin = createAsyncThunk<UserState, void, { state: any }>(
  `${NAME}/reLogin`,
  async (_, { getState }) => {
    const oldSessionToken = getAccessToken();
    beApi.defaults.headers["Authorization"] = `Bearer ${oldSessionToken}`
    const { user } = getState();

    if (oldSessionToken) {
      const {
        data: { email, session_token },
      } = await beService.login("", "");
      return { accessToken: session_token, email };
    }
    return { ...user };
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
      // .addCase(
      //   reLogin.fulfilled,
      //   (state, { payload }) => void Object.assign(state, payload)
      // )
      .addCase(
        logout.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      ),
});

export default slice.reducer;
