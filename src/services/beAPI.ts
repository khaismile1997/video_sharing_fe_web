import axios from 'axios'

import configs from 'config'
import { getAccessToken } from 'services/utils'

const token = getAccessToken()

const axiosConfigs = {
  headers: {
    Authorization: !token ? '' : `Bearer ${token}`,
  },
  timeout: 30000,
  baseURL: configs.api.beAPI,
}

export const beApi = axios.create(axiosConfigs)
