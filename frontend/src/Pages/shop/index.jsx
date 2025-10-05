import React, { useState } from 'react';
import './shop.scss';

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortBy, setSortBy] = useState('featured');

  // Dữ liệu mẫu
  const items = [
    {
      id: 1,
      name: 'Dragon Ball Set',
      description: 'Bộ trang bị rồng huyền thoại tăng sức mạnh vượt trội',
      price: 50000,
      originalPrice: 75000,
      currency: 'vang',
      category: 'equipment',
      image: 'https://via.placeholder.com/400x400/667eea/ffffff?text=Dragon+Set',
      inStock: true,
      discount: 33,
      rating: 4.8,
      reviews: 124,
      sold: 856
    },
    {
      id: 2,
      name: 'Phoenix Wings',
      description: 'Đôi cánh phượng hoàng mang lại tốc độ bay cao',
      price: 1000,
      originalPrice: 1200,
      currency: 'ngoc',
      category: 'equipment',
      image: 'https://via.placeholder.com/400x400/f093fb/ffffff?text=Wings',
      inStock: true,
      discount: 17,
      rating: 4.9,
      reviews: 89,
      sold: 523
    },
    {
      id: 3,
      name: 'Healing Potion x10',
      description: 'Combo 10 lọ thuốc hồi máu lớn, tiết kiệm hơn mua lẻ',
      price: 5000,
      originalPrice: 5000,
      currency: 'vang',
      category: 'consumable',
      image: 'https://via.placeholder.com/400x400/4facfe/ffffff?text=Potion',
      inStock: true,
      discount: 0,
      rating: 4.7,
      reviews: 456,
      sold: 2341,
      badge: 'Bán chạy'
    },
    {
      id: 4,
      name: 'Legendary Sword',
      description: 'Thanh kiếm huyền thoại của các vị anh hùng',
      price: 2000,
      originalPrice: 2500,
      currency: 'ngoc',
      category: 'weapon',
      image: 'https://via.placeholder.com/400x400/f6d365/ffffff?text=Sword',
      inStock: true,
      discount: 20,
      rating: 5.0,
      reviews: 67,
      sold: 234,
      badge: 'Mới'
    },
    {
      id: 5,
      name: 'Magic Shield',
      description: 'Khiên phép thuật chống lại mọi đòn tấn công',
      price: 30000,
      originalPrice: 30000,
      currency: 'vang',
      category: 'equipment',
      image: 'https://via.placeholder.com/400x400/43e97b/ffffff?text=Shield',
      inStock: false,
      discount: 0,
      rating: 4.6,
      reviews: 78,
      sold: 145
    },
    {
      id: 6,
      name: 'Speed Boots',
      description: 'Ủng tăng tốc độ di chuyển và né tránh',
      price: 800,
      originalPrice: 1000,
      currency: 'ngoc',
      category: 'equipment',
      image: 'https://via.placeholder.com/400x400/fa709a/ffffff?text=Boots',
      inStock: true,
      discount: 20,
      rating: 4.8,
      reviews: 234,
      sold: 1023,
      badge: 'Giảm giá'
    },
    {
      id: 7,
      name: 'Mystery Box',
      description: 'Hộp bí ẩn chứa phần thưởng ngẫu nhiên có giá trị cao',
      price: 15000,
      originalPrice: 15000,
      currency: 'vang',
      category: 'special',
      image: 'https://via.placeholder.com/400x400/feca57/ffffff?text=Box',
      inStock: true,
      discount: 0,
      rating: 4.5,
      reviews: 892,
      sold: 3456,
      badge: 'Hot'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', count: 7 },
    { id: 'equipment', name: 'Trang bị', count: 3 },
    { id: 'weapon', name: 'Vũ khí', count: 1 },
    { id: 'consumable', name: 'Tiêu hao phẩm', count: 1 },
    { id: 'special', name: 'Vật phẩm đặc biệt', count: 1 }
  ];

  const formatNumber = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="shop">
      <div className="shop-wrapper">
        {/* Top Navigation Bar */}
        <div className="top-bar">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <span className="top-bar-text">🎉 Giảm giá đến 50% cho sản phẩm mới</span>
            </div>
            <div className="top-bar-right">
              <button className="top-bar-link">Hỗ trợ</button>
              <button className="top-bar-link">Theo dõi đơn hàng</button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className="shop-header">
          <div className="header-container">
            <div className="logo-section">
              <h1 className="logo">🛒 SHOP</h1>
            </div>
            
            <div className="search-section">
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm sản phẩm, vật phẩm..." 
                  className="search-input"
                />
                <button className="search-button">
                  <span>🔍</span>
                </button>
              </div>
            </div>

            <div className="header-actions">
              <div className="wallet-display">
                <div className="wallet-item">
                  <span className="wallet-icon">💎</span>
                  <div className="wallet-info">
                    <span className="wallet-label">Vàng</span>
                    <span className="wallet-value">50,000</span>
                  </div>
                </div>
                <div className="wallet-divider"></div>
                <div className="wallet-item">
                  <span className="wallet-icon">💠</span>
                  <div className="wallet-info">
                    <span className="wallet-label">Ngọc</span>
                    <span className="wallet-value">1,500</span>
                  </div>
                </div>
              </div>
              <button className="cart-button">
                <span className="cart-icon">🛒</span>
                <span className="cart-badge">3</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="shop-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Danh mục</h3>
              <div className="category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-link ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Lọc theo giá</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Dưới 10,000</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>10,000 - 50,000</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>Trên 50,000</span>
                </label>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Đánh giá</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>⭐⭐⭐⭐⭐ (5 sao)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>⭐⭐⭐⭐ (4 sao trở lên)</span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" />
                  <span>⭐⭐⭐ (3 sao trở lên)</span>
                </label>
              </div>
            </div>

            <div className="promo-banner">
              <div className="promo-content">
                <h4>🎁 Ưu đãi đặc biệt</h4>
                <p>Giảm giá 20% cho đơn hàng đầu tiên</p>
                <button className="promo-button">Xem ngay</button>
              </div>
            </div>
          </aside>

          {/* Products Area */}
          <main className="products-area">
            {/* Toolbar */}
            <div className="products-toolbar">
              <div className="toolbar-left">
                <p className="result-count">
                  Hiển thị <strong>{filteredItems.length}</strong> sản phẩm
                </p>
              </div>
              <div className="toolbar-right">
                <label className="sort-label">Sắp xếp:</label>
                <select 
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Nổi bật</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá: Thấp đến cao</option>
                  <option value="price-high">Giá: Cao đến thấp</option>
                  <option value="best-selling">Bán chạy nhất</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredItems.map(item => (
                <div key={item.id} className="product-card">
                  {item.discount > 0 && (
                    <span className="discount-badge">-{item.discount}%</span>
                  )}
                  {item.badge && (
                    <span className={`status-badge ${item.badge.toLowerCase()}`}>
                      {item.badge}
                    </span>
                  )}
                  {!item.inStock && (
                    <div className="out-of-stock-overlay">
                      <span>Hết hàng</span>
                    </div>
                  )}

                  <div className="product-image">
                    <img src={item.image} alt={item.name} />
                    <div className="product-actions">
                      <button className="action-btn" title="Xem nhanh">
                        👁️
                      </button>
                      <button className="action-btn" title="Yêu thích">
                        ❤️
                      </button>
                    </div>
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-description">{item.description}</p>
                    
                    <div className="product-rating">
                      <div className="stars">
                        {'⭐'.repeat(Math.floor(item.rating))}
                      </div>
                      <span className="rating-text">
                        {item.rating} ({item.reviews} đánh giá)
                      </span>
                    </div>

                    <div className="product-footer">
                      <div className="price-section">
                        <div className="price-row">
                          <span className="currency-icon">
                            {item.currency === 'vang' ? '💎' : '💠'}
                          </span>
                          <span className="current-price">
                            {formatNumber(item.price)}
                          </span>
                        </div>
                        {item.discount > 0 && (
                          <span className="original-price">
                            {formatNumber(item.originalPrice)}
                          </span>
                        )}
                      </div>
                      <button 
                        className="add-to-cart-btn"
                        disabled={!item.inStock}
                        onClick={() => setSelectedItem(item)}
                      >
                        {item.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
                      </button>
                    </div>

                    <div className="product-meta">
                      <span className="meta-item">🔥 Đã bán: {formatNumber(item.sold)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>
              ✕
            </button>
            
            <div className="modal-body">
              <div className="modal-image-section">
                <img src={selectedItem.image} alt={selectedItem.name} />
              </div>

              <div className="modal-details-section">
                <div className="modal-header">
                  {selectedItem.badge && (
                    <span className={`badge ${selectedItem.badge.toLowerCase()}`}>
                      {selectedItem.badge}
                    </span>
                  )}
                  <h2 className="modal-title">{selectedItem.name}</h2>
                  <div className="modal-rating">
                    <div className="stars">{'⭐'.repeat(Math.floor(selectedItem.rating))}</div>
                    <span>{selectedItem.rating} ({selectedItem.reviews} đánh giá)</span>
                  </div>
                </div>

                <div className="modal-price-section">
                  <div className="price-display">
                    <span className="currency-icon">
                      {selectedItem.currency === 'vang' ? '💎' : '💠'}
                    </span>
                    <span className="price">{formatNumber(selectedItem.price)}</span>
                    {selectedItem.discount > 0 && (
                      <>
                        <span className="old-price">{formatNumber(selectedItem.originalPrice)}</span>
                        <span className="discount">-{selectedItem.discount}%</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="modal-description">
                  <h3>Mô tả sản phẩm</h3>
                  <p>{selectedItem.description}</p>
                </div>

                <div className="modal-info-grid">
                  <div className="info-item">
                    <span className="info-label">Tình trạng:</span>
                    <span className={`info-value ${selectedItem.inStock ? 'in-stock' : 'out-stock'}`}>
                      {selectedItem.inStock ? '✓ Còn hàng' : '✗ Hết hàng'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Đã bán:</span>
                    <span className="info-value">{formatNumber(selectedItem.sold)} sản phẩm</span>
                  </div>
                </div>

                <div className="modal-actions">
                  <div className="quantity-selector">
                    <button className="qty-btn">-</button>
                    <input type="number" value="1" className="qty-input" readOnly />
                    <button className="qty-btn">+</button>
                  </div>
                  <button className="btn-add-cart" disabled={!selectedItem.inStock}>
                    🛒 Thêm vào giỏ hàng
                  </button>
                  <button className="btn-buy-now" disabled={!selectedItem.inStock}>
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;