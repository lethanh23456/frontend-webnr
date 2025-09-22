// User.js
import React, { useState } from 'react';
import './user.scss';
import NhanVat from "../../assets/524.png";

function User() {
  const [currentBalance, setCurrentBalance] = useState(125000);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const handleDeposit = () => {
    if (depositAmount && !isNaN(depositAmount)) {
      setCurrentBalance(prev => prev + parseInt(depositAmount));
      setDepositAmount('');
      setShowDepositModal(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
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
            <h2 className="username">Goku_Fighter</h2>
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

        {/* Balance Section */}
        <div className="balance-section">
          <div className="balance-card">
            <h3>💰 Tài khoản hiện có</h3>
            <div className="balance-amount">
              {formatCurrency(currentBalance)}
            </div>
            <button 
              className="deposit-btn"
              onClick={() => setShowDepositModal(true)}
            >
              + Nạp tiền
            </button>
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

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="modal-overlay" onClick={() => setShowDepositModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>💳 Nạp tiền vào tài khoản</h3>
            <div className="deposit-form">
              <input
                type="number"
                placeholder="Nhập số tiền muốn nạp"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="deposit-input"
              />
              <div className="quick-amounts">
                <button onClick={() => setDepositAmount('50000')}>50,000₫</button>
                <button onClick={() => setDepositAmount('100000')}>100,000₫</button>
                <button onClick={() => setDepositAmount('200000')}>200,000₫</button>
                <button onClick={() => setDepositAmount('500000')}>500,000₫</button>
              </div>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowDepositModal(false)}>
                  Hủy
                </button>
                <button className="confirm-btn" onClick={handleDeposit}>
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;