import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
    const token = localStorage.getItem("token");
    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default PrivateRoute;
