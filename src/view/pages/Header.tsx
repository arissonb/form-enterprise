import { Typography, IconButton, Toolbar, Box, AppBar, Avatar } from '@mui/material/';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Formulario Empresa
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar alt="Cindy Baker" src="src/assets/logo_syonet.png" />  </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
