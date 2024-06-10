import axios from 'axios'
import { getToken } from '../services/token'
const baseUrl = ''

const getDepartmentUsers = async () => {
  const response = await axios.get(`${baseUrl}/admin/departmentAccounts`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const getPendingUsers = async () => {
  const response = await axios.get(`${baseUrl}/admin/pendingAccounts`, {
    headers: { Authorization: getToken() },
  })
  return response.data
}

const changeUserStatus = async (newStatus, id) => {
  console.log('response.data')
  const response = await axios.put(
    `${baseUrl}/admin/pendingAccounts/${id}`,
    { status: newStatus },
    { headers: { Authorization: getToken() } }
  )
  console.log(response.data)
  return response.data
}
const adminService = { getDepartmentUsers, getPendingUsers, changeUserStatus }
export default adminService
