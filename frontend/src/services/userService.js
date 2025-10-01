// userService.js
import { api } from '../api/client';

class UserService {

  async get10sucmanh(){
    const response = await api.get('/top10sucmanh');
    return response;
  }
  async get10vang(){
    const response = await api.get('/top10vang');
    return response;
  }
  async login(username, password) {
    try {
      const response = await api.post('/login', {
        username: username,
        password: password
      });
      return {
        success: true,
        data: response.data,
        message: 'Đăng nhập thành công!'
      };
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
      
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Tài khoản hoặc mật khẩu không đúng!'
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.error || 'Đăng nhập thất bại!'
      };
    }
  }

  async register(username, password) {
    try {
      const response = await api.post('/register', {
        username: username,
        password: password
      });
      
      // Backend trả về boolean
      const isSuccess = response.data;
      
      if (isSuccess) {
        return {
          success: true,
          message: 'Đăng ký thành công!'
        };
      } else {
        return {
          success: false,
          error: 'Tên đăng nhập đã tồn tại!'
        };
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      
      if (error.response?.status === 400) {
        return {
          success: false,
          error: 'Tên đăng nhập đã tồn tại!'
        };
      }
      
      if (error.response?.status === 500) {
        return {
          success: false,
          error: 'Lỗi server, vui lòng thử lại sau!'
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.error || 'Đăng ký thất bại!'
      };
    }
  }

  async getBalance(username) {
    try {
      const response = await api.get(`/balance/${username}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Lỗi khi load balance:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Không thể tải thông tin tài khoản!'
      };
    }
  }

  async addVangNapTuWeb(username, amount) {
    try {
      const response = await api.post('/addVangNapTuWeb', {
        username: username,
        amount: amount
      });
      
      return {
        success: true,
        data: response.data,
        message: `Nạp ${amount} vàng thành công! Tổng: ${response.data.totalVangNapTuWeb}`
      };
    } catch (error) {
      console.error('Lỗi khi nạp vàng:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Nạp vàng thất bại!'
      };
    }
  }

  async addNgocNapTuWeb(username, amount) {
    try {
      const response = await api.post('/addNgocNapTuWeb', {
        username: username,
        amount: amount
      });
      
      return {
        success: true,
        data: response.data,
        message: `Nạp ${amount} ngọc thành công! Tổng: ${response.data.totalNgocNapTuWeb}`
      };
    } catch (error) {
      console.error('Lỗi khi nạp ngọc:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Nạp ngọc thất bại!'
      };
    }
  }

  async useVangNapTuWeb(username, amount) {
    try {
      const response = await api.post('/useVangNapTuWeb', {
        username: username,
        amount: amount
      });
      
      return {
        success: true,
        data: response.data,
        message: `Đã sử dụng ${amount} vàng nạp từ web! Còn lại: ${response.data.remainingVangNapTuWeb}`
      };
    } catch (error) {
      console.error('Lỗi khi sử dụng vàng:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Không thể sử dụng vàng!'
      };
    }
  }

  async useNgocNapTuWeb(username, amount) {
    try {
      const response = await api.post('/useNgocNapTuWeb', {
        username: username,
        amount: amount
      });
      
      return {
        success: true,
        data: response.data,
        message: `Đã sử dụng ${amount} ngọc nạp từ web! Còn lại: ${response.data.remainingNgocNapTuWeb}`
      };
    } catch (error) {
      console.error('Lỗi khi sử dụng ngọc:', error);
      return {
        success: false,
        error: error.response?.data?.error || 'Không thể sử dụng ngọc!'
      };
    }
  }

  validateDepositAmount(amount) {
    if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
      return {
        isValid: false,
        error: 'Vui lòng nhập số tiền hợp lệ!'
      };
    }
    
    return {
      isValid: true,
      amount: parseInt(amount)
    };
  }
}

export default new UserService();