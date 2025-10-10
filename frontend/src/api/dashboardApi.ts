import API from './axiosApi'

interface Notification {
  id: string
  message: string
  time: string
  type: string
}

interface NotificationsResponse {
  notifications: Notification[]
}

// Fetch notifications
export const getNotifications = () => 
  API.get<NotificationsResponse>('/notifications')
