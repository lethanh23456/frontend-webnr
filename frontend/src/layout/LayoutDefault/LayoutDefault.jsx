import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss";
import logoIcon from "../../assets/icon1.png";


function LayoutDefault() {
    return (
        <div className="layout-default">

            <header className="layout-default__header">
                <nav className="layout-default__nav">
                    <div className="container">
                        <Link>
                            <img src={logoIcon} className="logogame"/>
                        </Link>
                        <div className="navbarHeader">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to="/home" className="nav-link">
                                        <span className="text-upcase">TRANG CHỦ</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/sukien" className="nav-link">
                                    <span className="text-upcase">SƯ KIỆN</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/diendan" className="nav-link">
                                    <span className="text-upcase">DIỄN ĐÀN</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/vongquay" className="nav-link">
                                    <span className="text-upcase">VÒNG QUAY</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/bangxh" className="nav-link">
                                    <span className="text-upcase">BẢNG XH</span>
                                    </NavLink>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink to="/login" className="nav-link">
                                    <span className="text-upcase">ĐĂNG NHẬP</span>
                                    </NavLink>
                                </li> */}
                                {/* <li className="nav-item">
                                    <NavLink to="/register" className="nav-link">
                                    <span className="text-upcase">ĐĂNG KÝ</span>
                                    </NavLink>
                                </li> */}
                                 <li className="nav-item">
                                    <NavLink to="/user" className="nav-link">
                                    <span className="text-upcase">USER</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="layout-default__main">
                <Outlet />
            </main>
            <footer className="layout-default__footer">
                <div className="footer-content">
                    <div className="footer-main">
                        <div className="footer-section">
                            <h3>Về Chúng Tôi</h3>
                            <p>Trang web game hàng đầu Việt Nam với những trải nghiệm tuyệt vời nhất.</p>
                            <ul>
                                <li>Cập nhật tin tức game mới nhất</li>
                                <li>Cộng đồng game thủ sôi động</li>
                                <li>Hỗ trợ 24/7</li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h3>Liên Kết</h3>
                            <ul>
                                <li>Trang Chủ</li>
                                <li>Sự Kiện</li>
                                <li>Diễn Đàn</li>
                                <li>Vòng Quay</li>
                                <li>Bảng Xếp Hạng</li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h3>Hỗ Trợ</h3>
                            <ul>
                                <li>Trung tâm trợ giúp</li>
                                <li>Báo cáo lỗi</li>
                                <li>Điều khoản sử dụng</li>
                                <li>Chính sách bảo mật</li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h3>Liên Hệ</h3>
                            <p>📧 contact@nronline.com</p>
                            <p>📞 1900-xxxx</p>
                            <p>📍 Hà Nội, Việt Nam</p>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <div className="footer-text">
                            NR Online - Game Thủ Việt Nam
                        </div>
                        <div className="social-icons">
                            <a href="#" className="social-icon">📘</a>
                            <a href="#" className="social-icon">📷</a>
                            <a href="#" className="social-icon">🐦</a>
                            <a href="#" className="social-icon">📺</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LayoutDefault;