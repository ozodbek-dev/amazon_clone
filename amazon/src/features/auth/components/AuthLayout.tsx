import React, {ReactNode} from 'react';
import {Grid} from "@mui/material";

const AuthLayout = ({children}:{children:ReactNode}) => {
    return (
        <Grid sx={{p:2}} container direction={"column"} justifyContent={"flex-start"} alignItems={"center"}>
            <img src="amazon.png" alt="amazon-logo" width='150px'/>
            <main>{children}</main>
        </Grid>
    );
};

export default AuthLayout;
