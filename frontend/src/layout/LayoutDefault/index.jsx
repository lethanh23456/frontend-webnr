import { NavLink , Outlet} from "react-router-dom";
import "./LayoutDefault.css";


function LayoutDefault() {
    return (
        <>
            <div className ="layout-default">
                <header className="layout-default__header">
                    <div className="layout-default__logo">LOGO</div>
                    <div className="menu">
                        <ul>
                            <li>
                                <NavLink to="/">
                                    Trang chủ
                                </NavLink>
                            </li>
                            {/* {token && (<>
                            <li>
                                <NavLink to="Topic">
                                    Chủ đề
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="Answers">
                                    Các bài đã làm 
                                </NavLink>
                            </li>
                            </>)} */}

                        </ul>
                    </div>
                    {/* <div className = "layout-default__account">
                      {token ? (<>
                        <NavLink to = "/logout" >Đăng xuất</NavLink>
                      </>) : (<>
                        <NavLink to = "/login" >dang nhap</NavLink>
                        <NavLink to = "/register" >dang ky</NavLink>
                      </>)}
                    </div> */}
                </header>
                <main className="layout-default__main">
                    <Outlet />
                </main>
                <footer className="layout-default__footer">
                    Quiz 200000000000000000000000
                </footer>
            </div>
        </>
    );
}

export default LayoutDefault;