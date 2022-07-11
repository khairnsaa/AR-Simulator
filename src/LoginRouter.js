import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import AdminPanelLogin from "./pages/AdminPage/AdminPanelLogin";

const LoginRouter = ({children}) => {
    if(Cookies.get('token') === undefined){
        return <Navigate to='/login' replace />
    }

    return children
}
 
export default LoginRouter;