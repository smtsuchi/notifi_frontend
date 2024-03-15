import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, Typography, Avatar, LinearProgress } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CenterBox from '../../components/CenterBox';
import { ErrorType } from '../../types/responses/errorResponses';
import toast from 'react-hot-toast';
import { useApiErrorHandler } from '../../hooks/useApiErrorHandler';
import { useEditProfileMutation } from '../../slices/userSlice';
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
});

interface EditProfileFormProps {
    setOpen: (open: boolean) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ setOpen }) => {
    const { user, updateProfile, accessToken } = useAuth();
    const initialValues = {
        username: user.username,
        email: user.email,
        phone: user.phone,
    };
    const [ sendEditProfile, {isLoading} ] = useEditProfileMutation();
    const handleError = useApiErrorHandler();
    const handleSubmit = async ({username, email, phone}: typeof initialValues) => {
        try{
            const response = await sendEditProfile({body:{username, email, phone}, accessToken}).unwrap()
            if (response.status === 'ok'){
                toast.success(response.message)
                updateProfile(response.user)
                setOpen(false)
            }
        } catch (_e) {
            const e = _e as ErrorType
            handleError(e);
          }
    };
    return (
        <CenterBox>
            <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
                <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Edit Profile
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                            {isLoading && <LinearProgress />}
                        </Box>
                    )
                }}
            </Formik>
        </CenterBox>
    )
}

export default EditProfileForm;