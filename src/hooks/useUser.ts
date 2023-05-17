import { useSelector } from 'react-redux'

import { AppState } from 'store'

export const useUser = () => {
  const user = useSelector((state: AppState) => state.users)

  return user
}
