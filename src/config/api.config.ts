import { Env } from './env'

/**
 * Constructor
 */

type Config = {
  beAPI: string
}

const configs: Record<Env, Config> = {
  /**
   * Development configurations
   */
  development: {
    beAPI: 'http://localhost:3001/api/v1/',
  },

  /**
   * Staging configurations
   */
  test: {
    beAPI: 'http://localhost:3001/api/v1/',
  },

  /**
   * Production configurations
   */
  production: {
    beAPI: 'http://localhost:3001/api/v1/',
  },
}

/**
 * Module exports
 */
export default configs
