export const getAccessToken = () => {
    const token = localStorage.getItem('session_token')
    if (!token) return ''
    return token
  }