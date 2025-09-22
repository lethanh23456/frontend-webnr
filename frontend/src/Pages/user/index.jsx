// User.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './user.scss';
import NhanVat from "../../assets/524.png";

// Cấu hình base URL cho API
const API_BASE_URL = 'http://localhost:8080/api/auth';

// Tạo axios instance với config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

function User() {
  // State cho user info
  const [username, setUsername] = useState('123'); // Username từ login hoặc localStorage
  const [currentBalance, setCurrentBalance] = useState(125000);
  const [vangNapTuWeb, setVangNapTuWeb] = useState(0);
  const [ngocNapTuWeb, setNgocNapTuWeb] = useState(0);
  
  // State cho modal
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositType, setDepositType] = useState('vang'); // 'vang' hoặc 'ngoc'
  const [loading, setLoading] = useState(false);

  // Load balance khi component mount
  useEffect(() => {
    loadBalance();
  }, []);

  // Hàm load balance từ backend
  const loadBalance = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/balance/${username}`);
      
      if (response.status === 200) {
        setVangNapTuWeb(response.data.vangNapTuWeb || 0);
        setNgocNapTuWeb(response.data.ngocNapTuWeb || 0);
      }
    } catch (error) {
      console.error('Lỗi khi load balance:', error);
      alert('Không thể tải thông tin tài khoản!');
    } finally {
      setLoading(false);
    }
  };

  // Hàm nạp tiền (giả lập - trong thực tế sẽ tích hợp payment gateway)
  const handleDeposit = async () => {
    if (!depositAmount || isNaN(depositAmount) || parseInt(depositAmount) <= 0) {
      alert('Vui lòng nhập số tiền hợp lệ!');
      return;
    }

    try {
      setLoading(true);
      
      // Giả lập nạp tiền thành công
      // Trong thực tế, bạn cần tích hợp với payment gateway trước
      const amount = parseInt(depositAmount);
      
      // Gọi API để cộng thêm vào số hiện có trong database
      if (depositType === 'vang') {
        const response = await apiClient.post('/addVangNapTuWeb', {
          username: username,
          amount: amount
        });
        
        if (response.status === 200) {
          setVangNapTuWeb(response.data.totalVangNapTuWeb);
          alert(`Nạp ${amount} vàng thành công! Tổng: ${response.data.totalVangNapTuWeb}`);
        }
      } else {
        const response = await apiClient.post('/addNgocNapTuWeb', {
          username: username,
          amount: amount
        });
        
        if (response.status === 200) {
          setNgocNapTuWeb(response.data.totalNgocNapTuWeb);
          alert(`Nạp ${amount} ngọc thành công! Tổng: ${response.data.totalNgocNapTuWeb}`);
        }
      }
      
      setDepositAmount('');
      setShowDepositModal(false);
      
    } catch (error) {
      console.error('Lỗi khi nạp tiền:', error);
      alert(error.response?.data?.error || 'Nạp tiền thất bại!');
    } finally {
      setLoading(false);
    }
  };



  // Hàm sử dụng vàng nạp từ web
  const useVangNapTuWeb = async (amount) => {
    try {
      setLoading(true);
      
      const response = await apiClient.post('/useVangNapTuWeb', {
        username: username,
        amount: amount
      });
      
      if (response.status === 200) {
        setVangNapTuWeb(prev => prev - amount);
        alert(`Đã sử dụng ${amount} vàng nạp từ web! Còn lại: ${response.data.remainingVangNapTuWeb}`);
      }
    } catch (error) {
      console.error('Lỗi khi sử dụng vàng:', error);
      alert(error.response?.data?.error || 'Không thể sử dụng vàng!');
    } finally {
      setLoading(false);
    }
  };

  // Hàm sử dụng ngọc nạp từ web
  const useNgocNapTuWeb = async (amount) => {
    try {
      setLoading(true);
      
      const response = await apiClient.post('/useNgocNapTuWeb', {
        username: username,
        amount: amount
      });
      
      if (response.status === 200) {
        setNgocNapTuWeb(prev => prev - amount);
        alert(`Đã sử dụng ${amount} ngọc nạp từ web! Còn lại: ${response.data.remainingNgocNapTuWeb}`);
      }
    } catch (error) {
      console.error('Lỗi khi sử dụng ngọc:', error);
      alert(error.response?.data?.error || 'Không thể sử dụng ngọc!');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  return (
    <div className="user">
      <div className="user-container">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-card">
            <div className="avatar">
              <div className="avatar-img">
                 <img src={NhanVat} alt="galick" />
              </div>
              <div className="level-badge">42</div>
            </div>
            <h2 className="username">Goku_Fighter ({username})</h2>
            <p className="user-title">Saiyan Warrior</p>
            
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">🏆 Thành tích</span>
                <span className="stat-value">1,247</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">🔥 Chuỗi thắng</span>
                <span className="stat-value">15</span>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Section - Updated */}
        <div className="balance-section">
          <div className="balance-card">
            <h3>💰 Tài khoản hiện có</h3>
            <div className="balance-details">
              <div className="balance-item">
                <span className="balance-label">💎 Vàng nạp từ web:</span>
                <span className="balance-amount">{formatNumber(vangNapTuWeb)}</span>
              </div>
              <div className="balance-item">
                <span className="balance-label">💠 Ngọc nạp từ web:</span>
                <span className="balance-amount">{formatNumber(ngocNapTuWeb)}</span>
              </div>
              <div className="balance-item">
                <span className="balance-label">💵 Tiền mặt:</span>
                <span className="balance-amount">{formatCurrency(currentBalance)}</span>
              </div>
            </div>
            
            <div className="balance-actions">
              <button 
                className="deposit-btn"
                onClick={() => {setShowDepositModal(true); setDepositType('vang');}}
                disabled={loading}
              >
                + Nạp Vàng
              </button>
              <button 
                className="deposit-btn ngoc-btn"
                onClick={() => {setShowDepositModal(true); setDepositType('ngoc');}}
                disabled={loading}
              >
                + Nạp Ngọc
              </button>
              <button 
                className="refresh-btn"
                onClick={loadBalance}
                disabled={loading}
              >
                🔄 Làm mới
              </button>
            </div>
          </div>
        </div>

        {/* Usage Section - New */}
        <div className="usage-section">
          <div className="usage-card">
            <h3>⚡ Sử dụng tài nguyên</h3>
            <div className="usage-buttons">
              <div className="usage-group">
                <h4>💎 Vàng nạp từ web: {formatNumber(vangNapTuWeb)}</h4>
                <div className="quick-use">
                  <button onClick={() => useVangNapTuWeb(1000)} disabled={loading || vangNapTuWeb < 1000}>
                    Dùng 1,000
                  </button>
                  <button onClick={() => useVangNapTuWeb(5000)} disabled={loading || vangNapTuWeb < 5000}>
                    Dùng 5,000
                  </button>
                  <button onClick={() => useVangNapTuWeb(10000)} disabled={loading || vangNapTuWeb < 10000}>
                    Dùng 10,000
                  </button>
                </div>
              </div>
              
              <div className="usage-group">
                <h4>💠 Ngọc nạp từ web: {formatNumber(ngocNapTuWeb)}</h4>
                <div className="quick-use">
                  <button onClick={() => useNgocNapTuWeb(100)} disabled={loading || ngocNapTuWeb < 100}>
                    Dùng 100
                  </button>
                  <button onClick={() => useNgocNapTuWeb(500)} disabled={loading || ngocNapTuWeb < 500}>
                    Dùng 500
                  </button>
                  <button onClick={() => useNgocNapTuWeb(1000)} disabled={loading || ngocNapTuWeb < 1000}>
                    Dùng 1,000
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="actions-section">
          <div className="action-card">
            <h3>⚡ Hành động nhanh</h3>
            <div className="action-buttons">
              <button className="action-btn shop-btn">
                🛒 Mua đồ
              </button>
              <button className="action-btn inventory-btn">
                🎒 Kho đồ
              </button>
              <button className="action-btn settings-btn">
                ⚙️ Cài đặt
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <div className="activity-card">
            <h3>📜 Hoạt động gần đây</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">💎</span>
                <div className="activity-content">
                  <p>Mua Dragon Ball Set</p>
                  <small>2 giờ trước</small>
                </div>
                <span className="activity-amount">-50,000₫</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🏆</span>
                <div className="activity-content">
                  <p>Thắng Tournament</p>
                  <small>5 giờ trước</small>
                </div>
                <span className="activity-amount">+25,000₫</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">💰</span>
                <div className="activity-content">
                  <p>Nạp tiền</p>
                  <small>1 ngày trước</small>
                </div>
                <span className="activity-amount">+100,000₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal - Updated */}
      {showDepositModal && (
        <div className="modal-overlay" onClick={() => setShowDepositModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>
              {depositType === 'vang' ? '💎 Nạp Vàng' : '💠 Nạp Ngọc'}
            </h3>
            <div className="deposit-form">
              <input
                type="number"
                placeholder={`Nhập số ${depositType === 'vang' ? 'vàng' : 'ngọc'} muốn nạp`}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="deposit-input"
                disabled={loading}
              />
              <div className="quick-amounts">
                {depositType === 'vang' ? (
                  <>
                    <button onClick={() => setDepositAmount('1000')}>1,000</button>
                    <button onClick={() => setDepositAmount('5000')}>5,000</button>
                    <button onClick={() => setDepositAmount('10000')}>10,000</button>
                    <button onClick={() => setDepositAmount('50000')}>50,000</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setDepositAmount('100')}>100</button>
                    <button onClick={() => setDepositAmount('500')}>500</button>
                    <button onClick={() => setDepositAmount('1000')}>1,000</button>
                    <button onClick={() => setDepositAmount('5000')}>5,000</button>
                  </>
                )}
              </div>
              <div className="modal-actions">
                <button 
                  className="cancel-btn" 
                  onClick={() => setShowDepositModal(false)}
                  disabled={loading}
                >
                  Hủy
                </button>
                <button 
                  className="confirm-btn" 
                  onClick={handleDeposit}
                  disabled={loading}
                >
                  {loading ? 'Đang xử lý...' : 'Xác nhận'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Đang xử lý...</div>
        </div>
      )}
    </div>
  );
}

export default User;