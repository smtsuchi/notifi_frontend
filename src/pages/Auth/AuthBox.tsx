import React from 'react';
import { CssBaseline, Box, Container } from '@mui/material';

const AuthBox: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems={{ sm: "center" }}
            marginTop="24px"
            minHeight="100vh"
            minWidth="100vw"
        >

            <Container component="main" maxWidth="xs" sx={{ boxShadow: { xs: 0, sm: 3 }, borderRadius: 2, }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginY: 8,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {children}
                </Box>
            </Container>
        </Box>

    )
}

export default AuthBox