import React, {FormEvent} from 'react';
import {
    Box, Button, Divider,
    Grid, InputLabel, Stack, TextField,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";

const RegistrationFormComponent = () => {
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
                        Create Account
                    </Typography>
                    <Box>
                        <InputLabel
                            sx={{fontWeight: 500, marginTop: 1, color: "#000"}}
                            htmlFor={"name"}>
                            Your name
                        </InputLabel>
                        <TextField
                            type={"text"}
                            sx={{width: "100%"}}
                            name={"name"}
                            id={"name"}
                            variant={"outlined"}
                            size={"small"}
                        />
                    </Box>
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
                    <Box>
                        <InputLabel
                            sx={{fontWeight: 500, marginTop: 1, color: "#000"}}
                            htmlFor={"confirmPassword"}>
                            Confirm Password
                        </InputLabel>
                        <TextField
                            sx={{width: "100%"}}
                            type={"password"}
                            name={"confirmPassword"}
                            id={"confirmPassword"}
                            variant={"outlined"}
                            size={"small"}
                        />
                    </Box>

                    <Button
                        type={"submit"}
                        variant={"contained"}
                        sx={{height: "31px", color: 'black', textTransform: "none", backgroundColor: "#f0c14b"}}
                    >Register</Button>


                </Grid>
            </form>
            <Box sx={{marginTop: "1rem"}}>
                <small><span>By creating an account, You agree to Amazon's </span></small>
            </Box>
            <Box sx={{marginTop: "1rem"}}>
                <small>
                    <a href={"#"}
                       style={{textDecoration: "none"}}>
                        {" "} Conditions of use
                    </a>{" "} and{" "}
                    <a href={"#"}
                       style={{textDecoration: "none"}}>
                        {" "} Privacy policy
                    </a> </small>
            </Box>
            <Divider
                sx={{marginTop: "1rem", marginBottom: "1rem"}}/>
            <Box sx={{marginTop: "1rem"}}>
                <small><span>Already have an account ? <Link
                    to={"/login"}
                    style={{color: "#0000ee"}}>Login</Link></span></small>
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

export default RegistrationFormComponent;
