import { useCallback, useEffect, useMemo, useState } from "react";

import { useQuery } from "react-query";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import axiosAuth from "../Helpers/axiosAuth";
import Auth from "../Helpers/Auth";
import { useDispatch } from "react-redux";
import { SET_USER_DETAIL } from "../Store/entities/user";
import { Alert } from "../Helpers/message";

const pages = [
  {
    title: "Add Todo",
    path: `/add-todo`,
  },
  {
    title: "Add Todo Type",
    path: `/add-todo-type`,
  },
  {
    title: "All Todos",
    path: `/all-todos`,
  },
  {
    title: "Finished Todos",
    path: `/finished-todos`,
  },
];

const title = (
  <Link to="/">
    <span>Premium Todo List</span>
  </Link>
);

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Auth.isLoggedIn();
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      navigate("/sign-in");
      return;
    }
  }, [navigate]);

  const logout = useCallback(() => {
    Auth.logout();
    navigate("/sign-in");
  }, [navigate]);

  const settings = useMemo(() => {
    return [
      {
        title: "Profile",
        func: undefined,
      },
      {
        title: "Logout",
        func: logout,
      },
    ];
  }, [logout]);

  const dispatch = useDispatch();

  const profileFetcher = useCallback(async () => {
    const { data } = await axiosAuth.get("/users/me/", {
      headers: { Authorization: "Auth " + Auth.getToken("access") },
    });

    console.log(data);

    dispatch(SET_USER_DETAIL({ details: data }));

    return data;
  }, [dispatch]);

  const {
    data: user,
    isLoading: isUserLoading,
    isError,
    error,
  } = useQuery(["current-user"], () => profileFetcher());

  if (isUserLoading) {
    return <></>;
  }

  if (isError) {
    Alert.fire({
      titleText: error,
      icon: "error",
    });
    return <></>;
  }

  return (
    <AppBar
      color="primary"
      className="bg-red-500"
      sx={{ top: 0 }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            {title}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ title, path }) => (
                <MenuItem key={title} onClick={() => setAnchorElNav(null)}>
                  <NavLink to={path}>
                    <Typography textAlign="center">{title}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ title, path }) => (
              <Button
                key={title}
                onClick={() => setAnchorElNav(null)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink to={path}>{title}</NavLink>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(event) => setAnchorElUser(event.currentTarget)}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={user.first_name + " " + user.last_name}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map(({ title, func }) => (
                <MenuItem
                  key={title}
                  onClick={() => {
                    setAnchorElUser(null);
                    func();
                  }}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
