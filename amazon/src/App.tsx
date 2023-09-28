import {Navigate, Route, Routes} from "react-router-dom";
import {Home, Login, Register} from "@/pages";
import PrivateRoute from "./features/auth/components/PrivateRoute";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux/hooks";
import { veriryJwt } from "./features/auth/auth.slice";


function App() {
    const {  jwt } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  
   useEffect(() => {
			if (!jwt) return;
			dispatch(veriryJwt(jwt));
   }, []);
  
  
  return (
		<Routes>
			<Route
				path='/'
				element={
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				}
			/>
			<Route path='/register' element={<Register />} />
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
}

export default App
