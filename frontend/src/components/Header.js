import React from "react";
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab, useMediaQuery, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Redux/store";
import toast from 'react-hot-toast';

const Header = () => {
  // global state
  let isLogin = useSelector(state => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = React.useState(0);

  // logout function
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("logout successfully!!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // normal state
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ backgroundColor: "black" , overflowX: "auto"}}>
          <Typography variant="h4">
            My Blog app
          </Typography>
          {isLogin && (
            <>
              {isSmallScreen ? (
                <Box display="flex" marginLeft="auto">
                  <Tabs textColor="inherit" value={value} onChange={(e, value) => setValue(value)}>
                    <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                    <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                    <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
                  </Tabs>
                </Box>
              ) : (
                <Box display="flex" marginLeft="auto">
                  <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/blogs">
                    Blogs
                  </Button>
                  <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/my-blogs">
                    My Blogs
                  </Button>
                  <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/create-blog">
                    Create Blog
                  </Button>
                </Box>
              )}
            </>
          )}
          <Box display="flex"  marginLeft="auto">
            {!isLogin && (
              <>
                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">
                  Login
                </Button>
                <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register">
                  Register
                </Button>
              </>
            )}
            {isLogin && <Button sx={{ margin: 1, color: 'white' }} onClick={handleLogout}>Logout</Button>}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
