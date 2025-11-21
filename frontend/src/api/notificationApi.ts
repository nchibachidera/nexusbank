 import API from "./axiosApi";

interface Notification {
  id: string;
  type: 'transaction' | 'account' | 'security' | 'system' | 'savings';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  metadata?: any;
  createdAt: string;
}

interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

// Get all notifications
export const getNotifications = (unreadOnly = false) => 
  API.get<NotificationsResponse>(`/notifications?unreadOnly=${unreadOnly}`);

// Mark as read
export const markNotificationAsRead = (id: string) => 
  API.patch(`/notifications/${id}/read`);

// Mark all as read
export const markAllNotificationsAsRead = () => 
  API.patch('/notifications/read-all');

// Delete notification
export const deleteNotification = (id: string) => 
  API.delete(`/notifications/${id}`);