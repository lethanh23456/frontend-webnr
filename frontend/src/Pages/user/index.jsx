import React, { useState, useEffect } from 'react';
import UserService from '../../services/userService'
import './user.scss';
import NhanVat from "../../assets/524.png";
import { Navigate } from "react-router-dom";

function User() {
  const [user, setUser] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [vangNapTuWeb, setVangNapTuWeb] = useState(0);
  const [ngocNapTuWeb, setNgocNapTuWeb] = useState(0);

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositType, setDepositType] = useState('vang');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (user?.username) {
      loadBalance();
    }
  }, [user]);

  const loadUserFromStorage = () => {
    setInitialLoading(true);
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setInitialLoading(false);
  };

  const loadBalance = () => {
    if (!user?.username) return;

    setLoading(true);
    UserService.getBalance(user.username)
      .then(result => {
        if (result.success) {
          setVangNapTuWeb(result.data.vangNapTuWeb || 0);
          setNgocNapTuWeb(result.data.ngocNapTuWeb || 0);
          setCurrentBalance(result.data.currentBalance || 0);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setVangNapTuWeb(0);
    setNgocNapTuWeb(0);
    setCurrentBalance(0);
    return <Navigate to="/resgister" replace />;
  };

  const handleDeposit = () => {
    const validation = UserService.validateDepositAmount(depositAmount);
    if (!validation.isValid) return;

    setLoading(true);
    const action =
      depositType === 'vang'
        ? UserService.addVangNapTuWeb(user.username, validation.amount)
        : UserService.addNgocNapTuWeb(user.username, validation.amount);

    action
      .then(result => {
        if (result.success) {
          if (depositType === 'vang') setVangNapTuWeb(result.data.totalVangNapTuWeb);
          else setNgocNapTuWeb(result.data.totalNgocNapTuWeb);

          setDepositAmount('');
          setShowDepositModal(false);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const useVangNapTuWeb = (amount) => {
    setLoading(true);
    UserService.useVangNapTuWeb(user.username, amount)
      .then(result => {
        if (result.success) setVangNapTuWeb(prev => prev - amount);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const useNgocNapTuWeb = (amount) => {
    setLoading(true);
    UserService.useNgocNapTuWeb(user.username, amount)
      .then(result => {
        if (result.success) setNgocNapTuWeb(prev => prev - amount);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

  const formatNumber = (num) =>
    new Intl.NumberFormat('vi-VN').format(num);

  const openDepositModal = (type) => {
    setDepositType(type);
    setShowDepositModal(true);
  };

  if (initialLoading) {
    return (
      <div className="user-loading">
        <div className="loading-spinner">Đang tải thông tin người dùng...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return (
    <div className="user">
      <div className="user-container">
        <div className="profile-section">
          <div className="profile-card">
            <div className="avatar">
              <div className="avatar-img">
                <img src={NhanVat} alt="avatar" />
              </div>
              <div className="level-badge">{user.level || 1}</div>
            </div>
            <h2 className="username">
              {user.displayName || user.username} ({user.username})
            </h2>
            <p className="user-title">{user.title || "New Player"}</p>
            
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">🏆 Thành tích</span>
                <span className="stat-value">{formatNumber(user.achievements || 0)}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">🔥 Chuỗi thắng</span>
                <span className="stat-value">{user.winStreak || 0}</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="logout-btn" onClick={handleLogout}>
                🚪 Đăng xuất
              </button>
            </div>
          </div>
        </div>


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
                onClick={() => openDepositModal('vang')}
                disabled={loading}
              >
                + Nạp Vàng
              </button>
              <button 
                className="deposit-btn ngoc-btn"
                onClick={() => openDepositModal('ngoc')}
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