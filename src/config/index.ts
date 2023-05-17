import { env } from './env'
import beApi from './api.config'

const configs = {
  api: beApi[env]
}

/**
 * Module exports
 */
export default configs