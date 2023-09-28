import { logout } from "@/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { Button } from "@mui/material";
import {FC} from "react";

const Home: FC<{}> = props => {
    const dispatch = useAppDispatch()
    const {isLoading,} = useAppSelector(state => state.auth)
     
    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <>
            Home
            <Button onClick={logoutHandler}>Logout</Button>
        </>
    );
};

export default Home