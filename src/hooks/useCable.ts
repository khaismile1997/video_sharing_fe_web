import { createConsumer } from '@rails/actioncable'
import configs from 'config'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from 'store'

export const useCable = () => {
  const [consumer, setComsumer] = useState(createConsumer())
  const {session_token} = useSelector((state: AppState) => state.users)

  useEffect(() => {
    const url = `${configs.api.cableURL}?token=${encodeURIComponent(session_token)}`;
    setComsumer(createConsumer(url))
  }, [session_token])

  return consumer
}
