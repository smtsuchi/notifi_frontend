import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Avatar, LinearProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CenterBox from '../../components/CenterBox';
import { useLoginMutation } from '../../slices/authSlice';
import { useAuth } from '../../hooks/useAuth';
import { ErrorType } from '../../types/responses/errorResponses';
import toast from 'react-hot-toast';
import { useApiErrorHandler } from '../../hooks/useApiErrorHandler';
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
  ,
  password: Yup.string()
    .required('Password is required')
  ,
});
const initialValues = {
  username: '',
  password: '',
};


const Login: React.FC = () => {
  const [sendLogin, {isLoading}] = useLoginMutation()
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleError = useApiErrorHandler();

  const handleSubmit = async ({ username, password }: typeof initialValues) => {
    try{
      const response = await sendLogin({username, password}).unwrap();
      if (response.status === 'ok'){
        login(response.user, response.access_token);
        toast.success(response.message);
        navigate('/')
      } 
    }
    catch (_e) {
      const e = _e as ErrorType
      handleError(e)
    }
    
  };

  return (
    <CenterBox>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {isLoading && <LinearProgress />}
              <Grid container>
                <Grid item>
                  <p>
                    Don't have an account?&nbsp;
                    <Link
                      to="/signup"
                      style={{ color: '#0061c0', textDecoration: 'underline' }}
                    >
                      {"Sign Up"}
                    </Link>
                  </p>
                </Grid>
              </Grid>
            </Box>
          )
        }}
      </Formik>
    </CenterBox>
  );
}
export default Login;