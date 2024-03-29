import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import { Menu as MenuIcon, NotificationsActive as NotificationsActiveIcon, Login as LoginIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogoutMutation } from '../slices/authSlice';
import toast from 'react-hot-toast';
import { ErrorType } from '../types/responses/errorResponses';
import { useApiErrorHandler } from '../hooks/useApiErrorHandler';

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const [sendLogout] = useLogoutMutation();
  const { logout, accessToken, isAuthenticated, user } = useAuth();
  let pages
  if ( isAuthenticated ){
    pages = [
      {
        label: 'My Subscriptions',
        link: '/subscriptions'
      },
      {
        label: 'Search',
        link: '/search'
      },
    ];
  } else {
    pages = [
      {
        label: 'My Subscriptions',
        link: '/subscriptions'
      },
    ];
  }
  const handleError = useApiErrorHandler();
  const settings = [{
    label: 'Profile',
    onClick: () => { navigate('/profile') }
  }, {
    label: 'Settings',
    onClick: () => { navigate('/settings') }
  }, {
    label: 'Dashboard',
    onClick: () => { navigate('/dashboard') }
  }, {
    label: 'Logout',
    onClick: async () => {
      try {
        const response = await sendLogout(accessToken).unwrap();
        if (response.status === 'ok') {
          logout();
          navigate('/login');
          toast.success(response.message);
        }
      } catch (_e) {
        const e = _e as ErrorType
        handleError(e)
      }
    }
  }];
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (callback: () => void) => {
    handleCloseUserMenu();
    callback();
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NotificationsActiveIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#thank-u-for-being-here"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NotiFi
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ label, link }) => (
                <Link key={label} to={link} onClick={handleCloseNavMenu}>
                  <MenuItem>
                    <Typography textAlign="center">
                      {label}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <NotificationsActiveIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#thank-you-for-being-here"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NotiFi
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ label, link }) => (
              <Link key={label} to={link}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated ? (<>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.username} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.label} onClick={() => handleClick(setting.onClick)}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>) : <>
              <Box sx={{ flexGrow: 1 }}>

                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'flex' } }}
                >
                  <Link to='/login'>
                    Log In
                  </Link>
                </Button>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  sx={{ display: { xs: 'flex', md: 'none' } }}
                >
                  <Link to='/login'>
                    <LoginIcon />
                  </Link>
                </IconButton>

              </Box>
            </>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
