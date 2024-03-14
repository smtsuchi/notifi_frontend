import React, { useState } from "react";
import CenterBox from "../../components/CenterBox";
import { Avatar, Badge, Box, Chip, Fab, IconButton, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { Mail as MailIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import EditProfileDrawer from "./EditProfileDrawer";


const Profile: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <CenterBox>
        <Box display='flex' flexDirection='column' justifyContent='space-between' gap='24px' height={{ xs: '100%' }}>
          <Box
            marginY='8px'
            display='flex'
            // justifyContent='space-between'
            gap='16px'
            flexDirection='column'
            textAlign='center'
            position='relative'
          >

            <Box display='flex' justifyContent='center'>

              <IconButton onClick={() => { }} sx={{ p: 0 }}>
                <Avatar
                  alt={user.username}
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: 84, height: 84 }}
                />
              </IconButton>
            </Box>
            <Typography
              sx={{
                fontWeight: 'bold'
              }}
            >
              {user.username}
            </Typography>
            <Chip
              icon={
                <Badge
                  color="secondary"
                  badgeContent={user.subscription_count}
                  max={99}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MailIcon />
                </Badge>
              }
              label={`${user.subscription_count} subscription${user.subscription_count && 's'}`}
              color="primary"
              onClick={() => navigate('/subscriptions')}
              clickable
            />
            <Typography
              sx={{
                fontWeight: 'semi-bold'
              }}
            >
              {user.email}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'semi-bold'
              }}
            >
              {user.phone}
            </Typography>
            {user.date_created && (
              <Typography
                variant="caption"
              >
                Account created{' '}
                <Moment date={user.date_created} />
              </Typography>
            )}

          </Box>
          <Box display='flex' flexDirection='row-reverse' marginRight='16px'>
            <Fab
              onClick={() => setOpen(true)}
              aria-label="edit"
              size="small"
              sx={{
              }}
            >
              <EditIcon />
            </Fab>
          </Box>
        </Box>
      </CenterBox>
      <EditProfileDrawer
        open={open}
        setOpen={setOpen}
      />
    </>
  )
};

export default Profile;
