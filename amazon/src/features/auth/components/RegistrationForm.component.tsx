import React, { FormEvent, useEffect } from "react";
import { Box, Button, Divider, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useInput } from "@/hooks";
import { validPassowrdMatch, validateEmail, validateNameLength, validatePasswordLength } from "@/shared/utils/validation";
import { NewUser } from "../models/NewUser.type";

const RegistrationFormComponent = () => {
	const {
		text: name,
		shouldDisplayError: nameError,
		hasBeenTouched: nameHasBeenTouched,
		inputChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		clearHandler: nameClearHandler,
	} = useInput(validateNameLength);
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
	const {
		text: confirmPassword,
		shouldDisplayError: confirmPasswordError,
		hasBeenTouched: confirmPasswordHasBeenTouched,
		inputChangeHandler: confirmPasswordChangeHandler,
		inputBlurHandler: confirmPasswordBlurHandler,
		clearHandler: confirmPasswordClearHandler,
	} = useInput(validatePasswordLength);

    const [errorMsg, setErrorMsg] = React.useState<string>("");
    
    const clearForm = () => {
        nameClearHandler();
        emailClearHandler();
        passwordClearHandler();
        confirmPasswordClearHandler();
    }
	const submitHandler = (e: FormEvent<HTMLElement>) => {
		e.preventDefault();
		if (!email || !password || !confirmPassword || !name) {
			setErrorMsg("All fields are required");
			return;
		}

		if (nameError || passwordError || confirmPasswordError || !validPassowrdMatch(password, confirmPassword).valid) {
			setErrorMsg("Somethign went wrong please check the form");
			return;
		}

		const newUser: NewUser = {
			name,
			email,
			password,
		};
        console.log(newUser);
        
        clearForm();
        
	};

	useEffect(() => {
		if (email && name && password && confirmPassword && validPassowrdMatch(password, confirmPassword).valid) {
			setErrorMsg("");
		}
	}, [name, email, password, confirmPassword]);

	return (
		<Box sx={{ border: 1, padding: 2, borderColor: "#ccc", width: "350px", marginTop: 2 }}>
			<form onSubmit={submitHandler}>
				<Grid container direction={"column"} justifyContent={"flex-start"} gap={1}>
					<Typography variant={"h4"} component={"h1"}>
						Create Account
					</Typography>
					{!!errorMsg && (
						<Typography style={{ backgroundColor: "red", color: "white", padding: "5px" }} variant={"body2"} component={"p"}>
							{errorMsg}
						</Typography>
					)}
					<Box>
						<InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000" }} htmlFor={"name"}>
							Your name
						</InputLabel>
						<TextField
							type={"text"}
							sx={{ width: "100%" }}
							name={"name"}
							id={"name"}
							variant={"outlined"}
							size={"small"}
							placeholder='Minimum 2 characters, maximum 20 characters'
							value={name}
							onChange={nameChangeHandler}
							onBlur={nameBlurHandler}
							error={nameError}
							helperText={nameError ? "Valid Name is required" : ""}
						/>
					</Box>
					<Box>
						<InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000" }} htmlFor={"email"}>
							Email
						</InputLabel>
						<TextField
							sx={{ width: "100%" }}
							value={email}
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
                            error={emailError}
                            helperText={emailError ? "Valid Email is required" : ""}
							placeholder='example@example.com'
							type={"email"}
							name={"email"}
							id={"email"}
							variant={"outlined"}
							size={"small"}
						/>
					</Box>

					<Box>
						<InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000" }} htmlFor={"password"}>
							Password
						</InputLabel>
						<TextField
							sx={{ width: "100%" }}
							type={"password"}
							value={password}
							onBlur={passwordBlurHandler}
							placeholder='Min 8 characters, Max 20 characters'
							error={passwordError}
							helperText={passwordError ? "Valid Password is required" : ""}
							onChange={passwordChangeHandler}
							name={"password"}
							id={"password"}
							variant={"outlined"}
							size={"small"}
						/>
					</Box>
					<Box>
						<InputLabel sx={{ fontWeight: 500, marginTop: 1, color: "#000" }} htmlFor={"confirmPassword"}>
							Confirm Password
						</InputLabel>
						<TextField
							sx={{ width: "100%" }}
							placeholder='Min 8 characters, Max 20 characters'
							type={"password"}
							value={confirmPassword}
							onChange={confirmPasswordChangeHandler}
							onBlur={confirmPasswordBlurHandler}
							error={confirmPasswordError || !validPassowrdMatch(password, confirmPassword).valid}
							helperText={
								confirmPasswordError
									? "Valid Password is required"
									: !validPassowrdMatch(password, confirmPassword).valid
									? validPassowrdMatch(password, confirmPassword).message
									: ""
							}
							name={"confirmPassword"}
							id={"confirmPassword"}
							variant={"outlined"}
							size={"small"}
						/>
					</Box>

					<Button
						type={"submit"}
						variant={"contained"}
						sx={{ height: "31px", color: "black", textTransform: "none", backgroundColor: "#f0c14b" }}
					>
						Register
					</Button>
				</Grid>
			</form>
			<Box sx={{ marginTop: "1rem" }}>
				<small>
					<span>By creating an account, You agree to Amazon's </span>
				</small>
			</Box>
			<Box sx={{ marginTop: "1rem" }}>
				<small>
					<a href={"#"} style={{ textDecoration: "none" }}>
						{" "}
						Conditions of use
					</a>{" "}
					and{" "}
					<a href={"#"} style={{ textDecoration: "none" }}>
						{" "}
						Privacy policy
					</a>{" "}
				</small>
			</Box>
			<Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
			<Box sx={{ marginTop: "1rem" }}>
				<small>
					<span>
						Already have an account ?{" "}
						<Link to={"/login"} style={{ color: "#0000ee" }}>
							Login
						</Link>
					</span>
				</small>
			</Box>
			<Box sx={{ marginTop: "1rem" }}>
				<small>
					<span>
						Buying for work?{" "}
						<a href='#' style={{ color: "#0000ee" }}>
							Create free business account
						</a>
					</span>
				</small>
			</Box>
		</Box>
	);
};

export default RegistrationFormComponent;
