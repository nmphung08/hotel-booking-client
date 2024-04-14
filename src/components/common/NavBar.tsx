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
    navigate("/bookings/management");
    handleClose();
  }

  return (
    <div className="sticky flex flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-evenly">
        <Link to="/" className="mr-2">
          Hoziv
        </Link>
        <Link to="/rooms/browse" className="mr-2">
          Browse all rooms
        </Link>
      </div>
      <div className="flex flex-row items-center justify-evenly">
        <Link to={"/bookings/search"} className="mr-2">
          Find my booking
        </Link>
        {isLoggedIn ? (
          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
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
            <Link to={"/login"} className="mr-2">
              Login
            </Link>
            <Link to={"/register"} className="mr-2">
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
