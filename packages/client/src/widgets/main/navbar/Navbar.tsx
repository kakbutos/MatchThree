import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, useState } from 'react';
import Logo from '@/assets/icons/logo.svg?react';
import s from './navbar.module.scss';
import { useNavigate } from 'react-router-dom';
import {
  getRouteForum,
  getRouteGame,
  getRouteLeaderBoard,
  getRouteLogin,
  getRouteProfile,
} from '@/constants/router/router';
import { useApiCall } from '@/hooks/useApiCall';
import { authApi } from '@/services/api/auth/auth-api';
import { AuthService } from '@/services/auth/auth';

const pages = [
  { title: 'Игра', routeFn: getRouteGame },
  { title: 'Доска победителей', routeFn: getRouteLeaderBoard },
  { title: 'Форум', routeFn: getRouteForum },
];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const [logout] = useApiCall(authApi.logout);
  const exit = async () => {
    await logout();
    AuthService.logout();
    navigate(getRouteLogin(), {
      replace: true,
    });
  };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className={s.nav} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Logo />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
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
              }}>
              {pages.map((page, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.routeFn());
                  }}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            <Logo />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.routeFn());
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Открыть настройки">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
              onClose={handleCloseUserMenu}>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  navigate(getRouteProfile('1'));
                }}>
                <Typography textAlign="center">Профиль</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  exit();
                }}>
                <Typography textAlign="center">Выйти</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
