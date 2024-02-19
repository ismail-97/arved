import axios from 'axios'
import { getToken } from '../services/token'

const baseUrl = 'http://localhost:3001'

const getInfo = async () => {
  const response = await axios.get(`${baseUrl}/user/info`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const editInfo = (async) => {}
const userService = { getInfo, editInfo }

export default userService
