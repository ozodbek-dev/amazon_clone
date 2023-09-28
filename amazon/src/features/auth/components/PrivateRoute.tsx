import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { FC, useEffect } from "react";
import { veriryJwt } from "../auth.slice";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface PrivateRouteProps {
  children: JSX.Element;
}
 
const PrivateRoute: FC<PrivateRouteProps> = ({ children }): JSX.Element => {
  const { isAuthenticated,isLoading, isSuccess,jwt } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (!jwt) return;
    dispatch(veriryJwt(jwt))
  }, [jwt, isSuccess])
  
 if (isLoading) return <CircularProgress sx={{ marginTop: "64px" }} />;
  return isAuthenticated ? children : <Navigate replace to="/login"/>;
}
 
export default PrivateRoute;