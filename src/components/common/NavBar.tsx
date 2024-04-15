import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { deleteAccount } from "../../api";

export default function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem("userRoles"));
    if (roles) {
      setIsloggedIn(true);
      if ((roles as any[]).includes("ROLE_ADMIN")) {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleClose = () => {
    return setAnchorEl(null);
  };

  const handleMenu = (event: any) => {
    setAnchorEl((event as Event).currentTarget);
  };

  function onLogout(): void {
    auth.handleLogout();
    navigate("/");
    handleClose();
  }

  function onAccountDelete(): void {
    deleteAccount().then();
    handleClose();
    auth.handleLogout();
  }

  function manageRooms() {
    navigate("/rooms/management");
    handleClose();
  }

  function manageBookings() {
    navigate("/bookings/management");
    handleClose();
  }

  function onHistory() {
    navigate("/history");
    handleClose();
  }

  return (
    <div className="fixed top-0 z-10 w-full h-16 shadow-lg bg-slate-200">
      <div className="w-[90%] h-full flex flex-row items-center justify-between m-auto">
        <div className="flex flex-row items-center justify-evenly">
          <Link
            to="/"
            className="text-xl font-bold tracking-wider text-teal-500"
          >
            Hoziv
          </Link>
          <Link
            to="/rooms/browse"
            className="ml-6 text-lg font-light tracking-wide"
          >
            Browse all rooms
          </Link>
        </div>
        <div className="flex flex-row items-center text-lg font-light tracking-wide justify-evenly">
          <Link to={"/bookings/search"}>Find my booking</Link>
          {isLoggedIn ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  marginLeft: "1.5rem",
                }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {isAdmin ? (
                  <>
                    <MenuItem onClick={manageRooms} key={1}>
                      Manage Rooms
                    </MenuItem>
                    <MenuItem onClick={manageBookings} key={2}>
                      Manage Bookings
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={onHistory} key={3}>
                    Booking history
                  </MenuItem>
                )}
                <MenuItem onClick={onLogout} key={4}>
                  Log out
                </MenuItem>
                {!isAdmin && (
                  <MenuItem onClick={onAccountDelete} key={5}>
                    Delete account
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="ml-6 text-lg font-light tracking-wide"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="ml-6 text-lg font-light tracking-wide"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
