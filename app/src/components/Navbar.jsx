import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Container,
    useMediaQuery,
    useTheme,
    Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

export default function Navbar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Mock user state - in a real app would come from auth context
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const user = {
        name: 'John Doe',
        avatar: null // Would be an image URL in a real app
    };

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    // Navigation items
    const navItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/home' },
        { text: 'Add Workout', icon: <DirectionsRunIcon />, path: '/workout' },
        { text: 'Add Exercise', icon: <FitnessCenterIcon />, path: '/exercise' },
    ];

    // Action items
    const actionItems = isLoggedIn
        ? [
            { text: 'Add Workout', icon: <AddIcon />, path: '/workout' },
            { text: 'Add Exercise', icon: <AddIcon />, path: '/exercise' },
            { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
            { text: 'Logout', icon: <LogoutIcon />, path: '/logout' },
        ]
        : [
            { text: 'Login', icon: <AccountCircleIcon />, path: '/' },
            { text: 'Sign Up', icon: <AddIcon />, path: '/signup' },
        ];

    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Avatar
                    sx={{ width: 64, height: 64, mb: 1, bgcolor: theme.palette.primary.main }}
                    src={user.avatar}
                >
                    {user.name.charAt(0)}
                </Avatar>
                {isLoggedIn && (
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {user.name}
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    {isLoggedIn ? 'Welcome back!' : 'Workout Planner'}
                </Typography>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem button key={item.text} component="a" href={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {actionItems.map((item) => (
                    <ListItem button key={item.text} component="a" href={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" elevation={2}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        {isMobile && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer(true)}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}

                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <FitnessCenterIcon sx={{ mr: 1 }} />
                            Workout Planner
                        </Typography>

                        {!isMobile && (
                            <>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.text}
                                            color="inherit"
                                            href={item.path}
                                            startIcon={item.icon}
                                        >
                                            {item.text}
                                        </Button>
                                    ))}
                                </Box>

                                <Divider orientation="vertical" flexItem sx={{ mx: 2, bgcolor: 'rgba(255,255,255,0.2)' }} />

                                {isLoggedIn ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            sx={{ ml: 1, cursor: 'pointer' }}
                                            src={user.avatar}
                                        >
                                            {user.name.charAt(0)}
                                        </Avatar>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Button variant="contained"
                                            color="secondary" href="/">Login</Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            href="/signup"
                                            sx={{ ml: 1 }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Box>
                                )}
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerContent}
            </Drawer>
        </>
    );
}