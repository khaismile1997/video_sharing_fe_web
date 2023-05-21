import { createConsumer } from "@rails/actioncable"
import { getAccessToken } from 'services/utils'
import configs from 'config'

const token = getAccessToken()

const url = `${configs.api.cableURL}?token=${encodeURIComponent(token)}`;

export default createConsumer(url)