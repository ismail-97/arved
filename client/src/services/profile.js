import axios from 'axios'
import { getToken } from '../services/token'

const apiUrl = process.env.REACT_APP_API_URL

const getInfo = async () => {
  const response = await axios.get(`${apiUrl}/user/info`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const editUser = async (editedUserInfo) => {
  const response = await axios.put(
    `${apiUrl}/user/edit-user`,
    editedUserInfo,
    {
      headers: { Authorization: getToken() },
    }
  )

  return response.data
}

const userService = { getInfo, editUser }

export default userService
