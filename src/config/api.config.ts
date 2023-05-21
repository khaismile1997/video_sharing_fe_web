import { Env } from './env'

/**
 * Constructor
 */

type Config = {
  beAPI: string,
  cableURL: string,
}

const configs: Record<Env, Config> = {
  /**
   * Development configurations
   */
  development: {
    beAPI: 'http://localhost:3001/api/v1/',
    cableURL: 'ws://localhost:3001/cable',
  },

  /**
   * Staging configurations
   */
  test: {
    beAPI: 'http://localhost:3001/api/v1/',
    cableURL: 'ws://localhost:3001/cable',
  },

  /**
   * Production configurations
   */
  production: {
    beAPI: 'https://video-sharing-web.herokuapp.com/api/v1/',
    cableURL: 'wss://video-sharing-web.herokuapp.com/cable',
  },
}

/**
 * Module exports
 */
export default configs
