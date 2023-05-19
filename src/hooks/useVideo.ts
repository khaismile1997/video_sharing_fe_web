import { useSelector } from 'react-redux'

import { AppState } from 'store'

export const useVideos = () => {
  const videos = useSelector((state: AppState) => state.videos.videoList)

  return videos
}

export const useMeta = () => {
  const meta = useSelector((state: AppState) => state.videos.meta)

  return meta
}

export const usePage = () => {
  const page = useSelector((state: AppState) => state.videos.page)

  return page
}
