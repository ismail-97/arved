import axios from 'axios'
// import { getToken } from '../services/token'

const baseUrl = ''

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const register = async (userInfo) => {
  const response = await axios.post(`${baseUrl}/register`, userInfo)
  return response
}

const sendPasswordLink = async (email) => {
  const response = await axios.post(`${baseUrl}/send-password-link`, email)

  return response.data
}
const getFaculties = async () => {
  const response = await axios.get(`${baseUrl}/faculties`)
  return response.data
}

// POST is used since can't send payload with get request.
const getDepartments = async (faculty) => {
  const response = await axios.post(`${baseUrl}/departments`, {
    faculty: faculty,
  })
  return response.data
}
const loginService = {
  login,
  register,
  getFaculties,
  getDepartments,
  sendPasswordLink,
}
export default loginService
