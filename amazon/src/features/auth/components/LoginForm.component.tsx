import React,  {FormEvent, useEffect} from 'react';
import {
    Box, Button,
    CircularProgress,
    Grid, InputLabel, TextField,
    Typography
} from "@mui/material";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { useInput } from '@/hooks';
import { validateEmail, validatePasswordLength } from '@/shared/utils/validation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux/hooks';
import { login, reset } from '../auth.slice';
import { LoginUser } from '../models/LoginUser.interface';

const LoginFormComponent = () => {
    const { isAuthenticated, isLoading, isSuccess } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const {
			text: email,
			shouldDisplayError: emailError,
			hasBeenTouched: emailHasBeenTouched,
			inputChangeHandler: emailChangeHandler,
			inputBlurHandler: emailBlurHandler,
			clearHandler: emailClearHandler,
		} = useInput(validateEmail);

		const {
			text: password,
			shouldDisplayError: passwordError,
			hasBeenTouched: passwordHasBeenTouched,
			inputChangeHandler: passwordChangeHandler,
			inputBlurHandler: passwordBlurHandler,
			clearHandler: passwordClearHandler,
        } = useInput(validatePasswordLength);
    
    const [errorMsg, setErrorMsg] = React.useState<string>("");
    function clearForm () {
        emailClearHandler();
        passwordClearHandler();
    }
    const submitHandler = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMsg("All fields are required");
            return;
        }
        if(emailError || passwordError) {
            setErrorMsg("Somethign went wrong please check the form");
            return;
        }
       dispatch(login({email, password} as LoginUser));
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            clearForm();
        }
    }, [dispatch, isSuccess])
    

    useEffect(() => {
        if (!isAuthenticated) return
           navigate('/')
    }, [isAuthenticated])
    
    if(isAuthenticated) return <Navigate to='/' />
	if (isLoading) return <CircularProgress sx={{ marginTop: "64px" }} />;

    return (

        <Box
            sx={{border: 1, padding: 2, borderColor: "#ccc", width: "350px", marginTop: 2}}>
            <form onSubmit={submitHandler}>
                <Grid container
                      direction={"column"}
                      justifyContent={"flex-start"}
                      gap={1}
                >
                    <Typography variant={"h4"}
                                component={"h1"}>
                      Login
                    </Typography>

                    <Box>
                        <InputLabel
                            sx={{fontWeight: 500, marginTop: 1, color: "#000"}}
                            htmlFor={"email"}
                            
                        >
                            Email
                        </InputLabel>
                        <TextField
                            value={email}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            placeholder='example@gmail.com'
                            helperText={emailError ? "Valid Email is required" : ""}
                            error={emailError}
                            required
                            sx={{width: "100%"}}
                            type={"email"}
                            name={"email"}
                            id={"email"}
                            variant={"outlined"}
                            size={"small"}
                        />
                    </Box>

                    <Box>
                        <InputLabel
                            sx={{fontWeight: 500, marginTop: 1, color: "#000"}}
                            htmlFor={"password"}>
                            Password
                        </InputLabel>
                        <TextField
                            value={password}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            error={passwordError}
                            helperText={passwordError ? "Valid Password is required" : ""}
                            sx={{width: "100%"}}
                            type={"password"}
                            name={"password"}
                            id={"password"}
                            variant={"outlined"}
                            size={"small"}
                        />
                    </Box>


                    <Button
                        type={"submit"}
                        variant={"contained"}
                        sx={{height: "31px", color: 'black', textTransform: "none", backgroundColor: "#f0c14b"}}
                    >Login</Button>


                </Grid>
            </form>

            <Box sx={{marginTop: "1rem"}}>
                <small><span>Do not have an account? <Link
                    to={"/register"}
                    style={{color: "#0000ee"}}>Register</Link></span></small>
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <small>
                    <span>Buying for work?{" "}
                        <a
                            href="#"
                            style={{color: "#0000ee"}}>Create free business account</a>
                </span>
                </small>
            </Box>
        </Box>
    );
};

export default LoginFormComponent;
