import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { beApi } from "services/beAPI";

import { beService } from "services/beService";

/**
 * Interface & Utility
 */

export type Video = {
    id: string,
    url: string,
    title: string,
    description: string,
    total_likes: number,
    total_dislikes: string
}

export type VideoState = {
  page: number;
  videos: Video[];
};

/**
 * Store constructor
 */

const NAME = "user";
export const initialState: VideoState = {
  page: 1,
  videos: [],
};

export const shareVideo = createAsyncThunk<
  VideoState,
  { url: string },
  { state: any }
>(`${NAME}/share`, async ({ url }, { getState }) => {
  const { data } = await beService.sharevideo(url);
  return {
    page: 1,
    videos: [],
  };
});

export const getListVideo = createAsyncThunk<VideoState, {}, { state: any }>(
  `${NAME}/getListVideo`,
  async ({}, { getState }) => {
    const { videos } = getState();

    const { data } = await beService.getvideos(videos.page);
    return { page: videos.page + 1, videos: [...videos.videos, ...data]  };
  }
);

export const like = createAsyncThunk<VideoState, {videoId: string}, { state: any }>(
    `${NAME}/like`,
    async ({videoId}, { getState }) => {
      const { videos } = getState();
  
      await beService.undislike(videoId);
      await beService.like(videoId)
      const updatedVideo = videos.videos.find((val: any)=>val.id = videoId)
      console.log('updatedVideo=> ',updatedVideo)
      return { page: videos.page + 1, videos: [...videos.videos]  };
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
        shareVideo.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      )
      .addCase(
        getListVideo.fulfilled,
        (state, { payload }) => void Object.assign(state, payload)
      ),
});

export default slice.reducer;
