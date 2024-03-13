import React from 'react';
import CenterBox from '../../components/CenterBox';
import { Box, FormControl, FormLabel, Switch, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Email as EmailIcon, PhoneIphone as PhoneIcon } from '@mui/icons-material';
import { NotificationMethodType } from '../../types/entities/UserType';
import { useAuth } from '../../hooks/useAuth';

const Settings: React.FC = () => {
  const {
    notificationMethod,
    setNotificationMethod,
    notifyOnDropOnly,
    setNotifyOnDropOnly
  } = useAuth();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newNotificationMethod: NotificationMethodType,
  ) => {
    if (newNotificationMethod !== null) {
      setNotificationMethod(newNotificationMethod);
    }
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifyOnDropOnly(event.target.checked);
  };
  return (
    <CenterBox>
      <Typography
        sx={{ textAlign: 'center', marginBottom: '16px' }}
        variant="h4"
        component="h4">
        Settings
      </Typography>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
        <FormControl
          component="fieldset"
          variant="standard" 
          sx={{ textAlign: 'center', marginBottom: '24px' }}
        >
          <FormLabel component="legend" sx={{ marginBottom: '8px' }}>Method of Notification</FormLabel>
          <ToggleButtonGroup
            value={notificationMethod}
            onChange={handleChange}
            aria-label="Medium sizes"
            color="primary"
            sx={{ justifyContent: 'center' }}
            exclusive
          >
            <ToggleButton value="email" key="email">
              <EmailIcon />
            </ToggleButton>,
            <ToggleButton value="phone" key="phone">
              <PhoneIcon />
            </ToggleButton>,
            <ToggleButton value="both" key="both">
              <EmailIcon />
              +
              <PhoneIcon />
            </ToggleButton>,
          </ToggleButtonGroup>
        </FormControl>
        <FormControl
          component="fieldset"
          variant="standard"
          sx={{ textAlign: 'center', justifyContent: 'center', marginBottom: '24px' }}
        >
          <FormLabel component="legend" sx={{ marginBottom: '8px' }}>Notify on drop only</FormLabel>
          <Box>
            <Switch
              checked={notifyOnDropOnly}
              onChange={handleToggle}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
        </FormControl>
      </Box>

    </CenterBox>
  )
}

export default Settings;