import React, { useState } from 'react';
import adminService from '../../services/adminService';
import './admin.scss';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ban');
  const [formData, setFormData] = useState({
    username: '',
    newRole: 'USER',
    adminName: '' 
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);


  React.useEffect(() => {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      setFormData(prev => ({ ...prev, adminName: currentUser.username }));
      
   
      if (currentUser.role !== 'ADMIN') {
        alert('Bạn không có quyền truy cập trang này!');
        navigate("/");
      }
    } else {
      alert('Vui lòng đăng nhập!');
      navigate("/login");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleBanUser = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      showMessage('error', 'Vui lòng nhập username!');
      return;
    }

    setLoading(true);
    try {
      const response = await adminService.banUser(
        formData.username,
        formData.adminName
      );
      showMessage('success', response);
      setFormData(prev => ({ ...prev, username: '' }));
    } catch (error) {
      showMessage('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnbanUser = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      showMessage('error', 'Vui lòng nhập username!');
      return;
    }

    setLoading(true);
    try {
      const response = await adminService.unbanUser(
        formData.username,
        formData.adminName
      );
      showMessage('success', response);
      setFormData(prev => ({ ...prev, username: '' }));
    } catch (error) {
      showMessage('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      showMessage('error', 'Vui lòng nhập username!');
      return;
    }

    setLoading(true);
    try {
      const response = await adminService.updateRole(
        formData.username,
        formData.newRole,
        formData.adminName
      );
      showMessage('success', response);
      setFormData(prev => ({ ...prev, username: '', newRole: 'USER' }));
    } catch (error) {
      showMessage('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin">
      <div className="admin-container">
        <h1 className="admin-title">Quản lý người dùng</h1>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={`tab ${activeTab === 'ban' ? 'active' : ''}`}
            onClick={() => setActiveTab('ban')}
          >
            Ban/Unban User
          </button>
          <button
            className={`tab ${activeTab === 'role' ? 'active' : ''}`}
            onClick={() => setActiveTab('role')}
          >
            Cập nhật Role
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'ban' && (
            <div className="tab-content">
              <h2>Ban/Unban người dùng</h2>
              <form onSubmit={handleBanUser}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Nhập username..."
                    disabled={loading}
                  />
                </div>
                <div className="button-group">
                  <button
                    type="submit"
                    className="btn btn-danger"
                    disabled={loading}
                  >
                    {loading ? 'Đang xử lý...' : 'Ban User'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleUnbanUser}
                    disabled={loading}
                  >
                    {loading ? 'Đang xử lý...' : 'Unban User'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'role' && (
            <div className="tab-content">
              <h2>Cập nhật quyền người dùng</h2>
              <form onSubmit={handleUpdateRole}>
                <div className="form-group">
                  <label htmlFor="username-role">Username</label>
                  <input
                    type="text"
                    id="username-role"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Nhập username..."
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newRole">Role mới</label>
                  <select
                    id="newRole"
                    name="newRole"
                    value={formData.newRole}
                    onChange={handleInputChange}
                    disabled={loading}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Cập nhật Role'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;