import axios from 'axios'
import { getToken } from '../services/token'

const apiUrl = process.env.REACT_APP_API_URL

const getDepartmentUsers = async () => {
  const response = await axios.get(`${apiUrl}/admin/departmentAccounts`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const getPendingUsers = async () => {
  const response = await axios.get(`${apiUrl}/admin/pendingAccounts`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const changeUserStatus = async (newStatus, id) => {
  const response = await axios.put(
    `${apiUrl}/admin/pendingAccounts/${id}`,
    { status: newStatus },
    { headers: { Authorization: getToken() } }
  )
  return response.data
}
const adminService = { getDepartmentUsers, getPendingUsers, changeUserStatus }
export default adminService
