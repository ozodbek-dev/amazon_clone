import  {FormEvent} from 'react';
import {
    Box, Button, Divider,
    Grid, InputLabel, TextField,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";

const LoginFormComponent = () => {
    const submitHandler = (e: FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('clicked')
    }

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
                            htmlFor={"email"}>
                            Email
                        </InputLabel>
                        <TextField

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
                            herf="#"
                            style={{color: "#0000ee"}}>Create free business account</a>
                </span>
                </small>
            </Box>
        </Box>
    );
};

export default LoginFormComponent;
