import React from 'react';
import EditProfileForm from './EditProfileForm';
import { SwipeableDrawer, IconButton, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';


interface EditProfileDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void
}

const iOS =
    typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const EditProfileDrawer: React.FC<EditProfileDrawerProps> = ({ open, setOpen }) => {

    return (

        <SwipeableDrawer
            sx={{
                borderTopLeftRadius: '16px',
                display: 'flex',
            }}
            anchor='bottom'
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}>
            <Box
                display='flex'
                justifyContent='right'
            >
                <IconButton
                    size='large'
                    onClick={() => setOpen(false)}
                    sx={{
                        margin: '16px'
                    }}
                >
                    <CancelIcon />
                </IconButton>
            </Box>
            <EditProfileForm setOpen={setOpen} />
        </SwipeableDrawer>
    );
}
export default EditProfileDrawer;