/**
 * Environment
 */
const getEnv = () => {
    console.log("env:", process.env.NODE_ENV);
    switch (process.env.NODE_ENV) {
      case 'development':
        return 'development'
      case 'test':
        return 'test'
      case 'production':
        return 'production'
      default:
        return 'development'
    }
  }
  export type Env = 'development' | 'test' | 'production'
  export const env: Env = getEnv()