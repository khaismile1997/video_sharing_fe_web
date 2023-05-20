import { createConsumer } from "@rails/actioncable"
import { getAccessToken } from 'services/utils'

const token = getAccessToken()

const url = `ws://localhost:3001/cable?token=${encodeURIComponent(token)}`;

export default createConsumer(url)