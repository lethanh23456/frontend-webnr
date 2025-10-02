import { api } from '../api/client';

class AdminService {
  // Ban user
  async banUser(username, adminName) {
    try {
      const response = await api.post('/banUser', null, {
        params: {
          username,
          adminName
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Có lỗi xảy ra khi ban user';
    }
  }

  // Unban user
  async unbanUser(username, adminName) {
    try {
      const response = await api.post('/unbanUser', null, {
        params: {
          username,
          adminName
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Có lỗi xảy ra khi unban user';
    }
  }

  // Update role
  async updateRole(username, newRole, adminName) {
    try {
      const response = await api.post('/updateRole', null, {
        params: {
          username,
          newRole,
          adminName
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Có lỗi xảy ra khi cập nhật role';
    }
  }
}

export default new AdminService();