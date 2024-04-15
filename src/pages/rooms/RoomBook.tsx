import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookingRoom, getRoom } from "../../api";
import { Box, Button, Modal, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WineBarIcon from "@mui/icons-material/WineBar";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

let defaultBookingInfo = {
  owner: "",
  checkInDate: dayjs(new Date()),
  checkOutDate: dayjs(new Date()),
  adults: 0,
  children: 0,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "border-radius": "8px",
};

export default function RoomBook() {
  const [room, setRoom] = useState(null);
  const [bookingInfo, setBookingInfo] = useState(defaultBookingInfo);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    getRoom(id).then((room) => {
      setRoom(room);
    });
  }, []);

  function onInfoChange(name: string, value: any) {
    setBookingInfo({ ...bookingInfo, [name]: value });
  }

  function onContinue() {
    setOpen(true);
  }

  function onModalClose() {
    setOpen(false);
  }

  function confirmBooking() {
    bookingRoom(room?.id, bookingInfo).then();
  }

  return (
    <div className="below-navbar pt-8 min-h-[100vh] mx-auto w-4/5 text-center">
      <div className="text-3xl font-semibold">Room Reservation</div>

      <div className="flex flex-row flex-wrap justify-center gap-10 mt-8">
        <div className="w-1/4">
          <img
            src={`data:image;base64,${room?.photo}`}
            title="Room photo"
            className="rounded-lg"
          />
        </div>

        <div className="w-1/4">
          <TextField
            label="Name"
            type="text"
            name="owner"
            value={bookingInfo.owner}
            sx={{
              width: "100%",
            }}
            onChange={(e) => {
              return onInfoChange(e.target.name, e.target.value);
            }}
          />

          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Check-in Date"
                name="checkIn"
                value={bookingInfo.checkInDate}
                sx={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onChange={(date) => {
                  return onInfoChange("checkInDate", date);
                }}
              />

              <DatePicker
                label="Check-out Date"
                name="checkOut"
                value={bookingInfo.checkOutDate}
                sx={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onChange={(date) => {
                  return onInfoChange("checkOutDate", date);
                }}
                className="mr-4"
              />
            </LocalizationProvider>
          </div>

          <div>
            <TextField
              label="Adults"
              type="number"
              name="adults"
              value={bookingInfo.adults}
              sx={{
                width: "100%",
                marginTop: "1rem",
              }}
              onChange={(e) => {
                return onInfoChange(e.target.name, e.target.value);
              }}
            />

            <TextField
              label="Children"
              type="number"
              name="children"
              value={bookingInfo.children}
              sx={{
                width: "100%",
                marginTop: "1rem",
              }}
              onChange={(e) => {
                return onInfoChange(e.target.name, e.target.value);
              }}
            />

            <Button
              variant="contained"
              sx={{
                width: "100%",
                marginTop: "1rem",
              }}
              onClick={onContinue}
            >
              Continue
            </Button>

            <Modal
              open={open}
              onClose={onModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className="text-2xl font-semibold">
                  Reservation Summary
                </div>

                <div className="mt-4">Name: {bookingInfo?.owner}</div>

                <div className="mt-2">
                  Check-in Date:{" "}
                  {bookingInfo?.checkInDate?.format("DD/MM/YYYY")}
                </div>
                <div className="mt-2">
                  Check-out Date:{" "}
                  {bookingInfo.checkOutDate?.format("DD/MM/YYYY")}
                </div>

                <div className="mt-2">Numbers of dates booked: {2}</div>

                <div className="mt-2">Number of guest</div>
                <div className="mt-2">Adults: {bookingInfo?.adults}</div>
                <div className="mt-2">Children: {bookingInfo?.children}</div>

                <div className="mt-2">Total payment: ${200}</div>

                <Button
                  variant="contained"
                  className="mr-4"
                  sx={{
                    marginTop: "1rem",
                  }}
                  onClick={confirmBooking}
                >
                  Confirm Booking and proceed to payment
                </Button>
              </Box>
            </Modal>
          </div>
        </div>

        <div className="w-1/4">
          <table className="border-collapse border border-slate-400 w-full">
            <tbody>
              <tr>
                <th className="border border-slate-300 py-2 px-4">
                  Room Type:
                </th>
                <td className="border border-slate-300 py-2 px-4">
                  {room?.roomType}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 px-4">
                  Price per night:
                </th>
                <td className="border border-slate-300 py-2 px-4">
                  ${room?.roomPrice}
                </td>
              </tr>
              <tr>
                <th className="border border-slate-300 py-2 px-4">
                  Room Service:
                </th>
                <td className="border border-slate-300 py-2 px-4 text-start">
                  <ul>
                    <li>
                      <WifiIcon /> Wifi
                    </li>
                    <li>
                      <TvIcon /> Netflix Premium
                    </li>
                    <li>
                      <RestaurantIcon /> Breakfast
                    </li>
                    <li>
                      <WineBarIcon /> Mini bar refreshment
                    </li>
                    <li>
                      <DirectionsCarIcon /> Car Service
                    </li>
                    <li>
                      <LocalParkingIcon /> Parking Space
                    </li>
                    <li>
                      <LocalLaundryServiceIcon /> Laundry
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
