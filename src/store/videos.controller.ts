import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { beService } from "services/beService";

/**
 * Interface & Utility
 */

export type Video = {
  id: string;
  url: string;
  title: string;
  description: string;
  total_likes: number;
  total_dislikes: number;
  liked: boolean | null;
};

export type VideoState = {
  page: number;
  videoList: Video[];
  meta: { per_page: number; total_pages: number };
};

/**
 * Store constructor
 */

const NAME = "user";
export const initialState: VideoState = {
  page: 1,
  videoList: [],
  meta: {
    per_page: 0,
    total_pages: 0,
  },
};

export const shareVideo = createAsyncThunk<
  VideoState,
  { url: string },
  { state: any }
>(`${NAME}/shareVideo`, async ({ url }, { getState }) => {
  const { videos } = getState();
  const { data, err } = await beService.sharevideo(url);
  if (err) {
    throw new Error("This video has already been taken");
  }

  return {
    ...videos,
    videoList: [data, ...videos.videoList],
  };
});

export const getListVideo = createAsyncThunk<
  VideoState,
  { page?: number },
  { state: any }
>(`${NAME}/getListVideo`, async ({ page }, { getState }) => {
  const { videos } = getState();

  const { data, err } = await beService.getvideos(page || videos.page);
  if (err || !data) return { ...videos };
  return {
    page: page || videos.page + 1,
    videoList: [...videos.videoList, ...data.data],
    meta: { ...data.meta },
  };
});

export const like = createAsyncThunk<
  VideoState,
  { videoId: string },
  { state: any }
>(`${NAME}/like`, async ({ videoId }, { getState }) => {
  const { videos } = getState();
  const { err } = await beService.like(videoId);
  if (err) {
    throw new Error("Can't like");
  }
  const updatedVideoList = videos.videoList.map((val: Video) => {
    if (val.id !== videoId) return val;
    const newObject = { ...val };
    newObject.liked = true;
    newObject.total_likes = newObject.total_likes + 1;
    return { ...newObject };
  });
  return { ...videos, videoList: [...updatedVideoList] };
});

export const unlike = createAsyncThunk<
  VideoState,
  { videoId: string },
  { state: any }
>(`${NAME}/unlike`, async ({ videoId }, { getState }) => {
  const { videos } = getState();
  const { err } = await beService.unlike(videoId);
  if (err) {
    throw new Error("Can't unlike");
  }
  const updatedVideoList = videos.videoList.map((val: Video) => {
    if (val.id !== videoId) return val;
    const newObject = { ...val };
    newObject.liked = null;
    newObject.total_likes = newObject.total_likes - 1;
    return { ...newObject };
  });
  return { ...videos, videoList: [...updatedVideoList] };
});

export const undislike = createAsyncThunk<
  VideoState,
  { videoId: string },
  { state: any }
>(`${NAME}/undislike`, async ({ videoId }, { getState }) => {
  const { videos } = getState();
  const { err } = await beService.dislike(videoId);
  if (err) {
    throw new Error("Can't undislike");
  }
  const updatedVideoList = videos.videoList.map((val: Video) => {
    if (val.id !== videoId) return val;
    const newObject = { ...val };
    newObject.liked = null;
    newObject.total_dislikes = newObject.total_dislikes - 1;
    return { ...newObject };
  });
  return { ...videos, videoList: [...updatedVideoList] };
});

export const dislike = createAsyncThunk<
  VideoState,
  { videoId: string },
  { state: any }
>(`${NAME}/dislike`, async ({ videoId }, { getState }) => {
  const { videos } = getState();
  const { err } = await beService.dislike(videoId);
  if (err) {
    throw new Error("Can't dislike");
  }
  const updatedVideoList = videos.videoList.map((val: Video) => {
    if (val.id !== videoId) return val;
    const newObject = { ...val };
    newObject.liked = false;
    newObject.total_dislikes = newObject.total_dislikes + 1;
    return { ...newObject };
  });
  return { ...videos, videoList: [...updatedVideoList] };
});

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
        shareVideo.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        like.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        unlike.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        dislike.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        undislike.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        getListVideo.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      ),
});

export default slice.reducer;
