import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Grid, Box, Typography, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthBox from './AuthBox';
import { useSignupMutation } from '../../slices/authSlice';
import { ErrorType } from '../../types/responses/errorResponses';
import toast from 'react-hot-toast';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object({
    username: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email("Email is not valid")
        .matches(/^(?!.*@[^,]*,)/, "Email is not valid")
        .required("Email is required"),
    phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required("Phone number is required"),
    password: Yup.string()
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required("Password confirmation is required")
});

const initialValues = {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
};

const SignUp: React.FC = () => {
    const [ sendSignup ] = useSignupMutation();
    const navigate = useNavigate();
    const handleSubmit = async ({username, password, email, phone}: typeof initialValues) => {
        try{
            const response = await sendSignup({username, password, email, phone}).unwrap()
            if (response.status === 'ok'){
                toast.success(response.message)
                navigate('/login')
            }
        } catch (_e) {
            const e = _e as ErrorType
            toast.error(e.data.message);
          }
    };
    return (
        <AuthBox>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
            >
                {({
                    errors,
                    touched,
                    handleSubmit,
                    values,
                    handleBlur,
                    handleChange
                }) => {
                    return (
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={values.username}
                                error={touched.username && Boolean(errors.username)}
                                helperText={touched.username && errors.username}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={values.email}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                                value={values.phone}
                                error={touched.phone && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                onBlur={handleBlur}
                                value={values.password}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="current-confirmPassword"
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <p>
                                        Already have an account?&nbsp;
                                        <Link
                                            to="/login"
                                            style={{ color: '#0061c0', textDecoration: 'underline' }}
                                        >
                                            {"Log In"}
                                        </Link>
                                    </p>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                }}
            </Formik>
        </AuthBox>
    )
}

export default SignUp