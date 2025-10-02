import React, { useState } from 'react';
import UserService from '../../services/userService';
import './Register.scss';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  confirmPassword?: string;
}

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      const result = await UserService.register(formData.username, formData.password);
      
      if (result.success) {
        alert(result.message || 'Đăng ký thành công!');
        setFormData({
          username: '',
          password: '',
          confirmPassword: ''
        });
        navigate("/login");
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
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2 className="register-title">Đăng Ký</h2>
          <p className="register-subtitle">Tạo tài khoản mới của bạn</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
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

          <div className="input-group">
            <div className="input-icon">
              <i className="icon">🔐</i>
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={loading}
              className={`form-input password-input ${errors.confirmPassword ? 'error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={loading}
              className="password-toggle"
            >
              {showConfirmPassword ? '🙈' : '👁'}
            </button>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" disabled={loading} className={`submit-button ${loading ? 'loading' : ''}`}>
            {loading ? <div className="spinner"></div> : <span className="button-icon">✨</span>}
            {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
          </button>
        </form>

        <div className="login-link">
          <span>Đã có tài khoản? </span>
          <button onClick={() => (navigate("/login"))} className="login-button">
            Đăng nhập ngay
          </button>
        </div>

        <div className="home-link">
          <button onClick={() => (navigate("/"))} className="home-button">
            <span className="home-icon">⬅</span> Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;