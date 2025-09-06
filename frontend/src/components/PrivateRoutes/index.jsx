import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

function PrivateRoutes() {
    // const isLogin = useSelector((state) => state.login);
    const isLogin = true;
    return(
        <>
            {isLogin ? (<Outlet />) : (<Navigate to = "/login" />)}
        </>
    )
}

export default PrivateRoutes;