import axios from 'axios'
import { getToken } from '../services/token'

const baseUrl = ''

const getInfo = async () => {
  const response = await axios.get(`${baseUrl}/user/info`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const editUser = async (editedUserInfo) => {
  const response = await axios.put(
    `${baseUrl}/user/edit-user`,
    editedUserInfo,
    {
      headers: { Authorization: getToken() },
    }
  )

  return response.data
}

const userService = { getInfo, editUser }

export default userService
