import { useSelector } from 'react-redux'

import { AppState } from 'store'

export const useVideos = () => {
  const videos = useSelector((state: AppState) => state.videos.videos)

  return videos
}
