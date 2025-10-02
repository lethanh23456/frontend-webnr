import React, { useState, useEffect } from 'react';
import UserService from '../../services/userService';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const result = await UserService.login(formData.username, formData.password);
      if (result.success) {
        const userData = {
          ...result.data,
          username: formData.username
        };

      
        localStorage.setItem('currentUser', JSON.stringify(userData));
        const saved = localStorage.getItem('currentUser');
        console.log("Saved user:", saved);

        if (rememberMe) {
          localStorage.setItem('rememberedUsername', formData.username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }

        alert(result.message || 'Đăng nhập thành công!');

     
        if (userData.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/user");
        }

      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Đã xảy ra lỗi không mong đợi!');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Đăng Nhập</h2>
          <p className="login-subtitle">Chào mừng bạn quay trở lại</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <i className="icon">👤</i>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Nhập tên đăng nhập"
              value={formData.username}
              onChange={handleInputChange}
              disabled={loading}
              className={`form-input ${errors.username ? 'error' : ''}`}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>

          <div className="input-group">
            <div className="input-icon">
              <i className="icon">🔒</i>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
              className={`form-input password-input ${errors.password ? 'error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="password-toggle"
            >
              {showPassword ? '🙈' : '👁'}
            </button>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
                className="checkbox"
              />
              Ghi nhớ tài khoản
            </label>
            <button type="button" className="forgot-password" onClick={() => (window.location.href = '/forgot-password')}>
              Quên mật khẩu?
            </button>
          </div>

          <button type="submit" disabled={loading} className={`submit-button ${loading ? 'loading' : ''}`}>
            {loading ? <div className="spinner"></div> : <span className="button-icon">➡️</span>}
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="register-link">
          <span>Chưa có tài khoản? </span>
          <button onClick={() => (window.location.href = '/register')} className="register-button">
            Đăng ký ngay
          </button>
        </div>

        <div className="home-link">
          <button onClick={() => (window.location.href = '/')} className="home-button">
            <span className="home-icon">⬅</span> Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;