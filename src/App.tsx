import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import {
  RoomAdd,
  RoomBook,
  RoomEdit,
  RoomsBrowse,
  RoomsManagement,
} from "./pages/rooms";
import { Footer, NavBar } from "./components/common";
import { BookingSearch, BookingsManagement } from "./pages/bookings";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { History } from "./pages/history";
import { AuthProvider, RequiredAuth } from "./components/auth";

export default function App() {
  return (
    <main>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/history" element={<History />} />

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/rooms/browse" element={<RoomsBrowse />} />
            <Route path="/rooms/management" element={<RoomsManagement />} />
            <Route path="/rooms/:id/edit" element={<RoomEdit />} />
            <Route path="/rooms/add" element={<RoomAdd />} />
            <Route
              path="/rooms/:id/book"
              element={
                <RequiredAuth>
                  <RoomBook />
                </RequiredAuth>
              }
            />

            <Route path="/bookings/search" element={<BookingSearch />} />
            <Route
              path="/bookings/management"
              element={<BookingsManagement />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </main>
  );
}
