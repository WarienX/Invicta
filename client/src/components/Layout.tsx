import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Client Profitability
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
              })}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/roles"
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              })}
            >
              Roles
            </NavLink>
            <NavLink
              to="/clients"
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              })}
            >
              Clients
            </NavLink>
            <NavLink
              to="/revenue"
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              })}
            >
              Revenue
            </NavLink>
            <NavLink
              to="/time-entries"
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              })}
            >
              Time Entries
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
}