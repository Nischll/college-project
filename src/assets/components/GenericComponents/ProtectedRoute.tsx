import { Navigate } from "react-router-dom";
import { useAuth } from "../useContext/AuthContext";

const ProtectedRoute = ({children, allowedRoles}) => {
  const {user} = useAuth();

  if (!user || !allowedRoles.includes(user.role)){
    return <Navigate to="/"/>
  }

  return children;
}
 
export default ProtectedRoute;