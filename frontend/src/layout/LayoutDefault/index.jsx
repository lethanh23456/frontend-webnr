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
                          

                        </ul>
                    </div>
                  
                </header>
                <main className="layout-default__main">
                    <Outlet />
                </main>
                <footer className="layout-default__footer">
                    nronlineeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                </footer>
            </div>
        </>
    );
}

export default LayoutDefault;