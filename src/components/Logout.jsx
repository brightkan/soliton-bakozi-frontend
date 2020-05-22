import auth from '../services/authService'

export default function Logout() {
  auth.logout()
  window.location = "/login"
  return null
}