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
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
    <div className="flex flex-row flex-wrap items-center justify-center w-4/5 gap-4 m-auto">
      <div className="w-1/4">
        <img src={`data:image;base64,${room?.photo}`} title="Room photo" />
      </div>

      <div className="w-1/4">
        <div>Reserve Room</div>

        <TextField
          label="Name"
          type="text"
          name="owner"
          value={bookingInfo.owner}
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
              onChange={(date) => {
                return onInfoChange("checkInDate", date);
              }}
              className="mr-4"
            />

            <DatePicker
              label="Check-out Date"
              name="checkOut"
              value={bookingInfo.checkOutDate}
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
            onChange={(e) => {
              return onInfoChange(e.target.name, e.target.value);
            }}
          />

          <TextField
            label="Children"
            type="number"
            name="children"
            value={bookingInfo.children}
            onChange={(e) => {
              return onInfoChange(e.target.name, e.target.value);
            }}
          />

          <Button variant="contained" className="mr-4" onClick={onContinue}>
            Continue
          </Button>

          <Modal
            open={open}
            onClose={onModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div>Reservation Summary</div>

              <div>Name: {bookingInfo?.owner}</div>

              <div>
                Check-in Date: {bookingInfo?.checkInDate?.format("DD/MM/YYYY")}
              </div>
              <div>
                Check-out Date: {bookingInfo.checkOutDate?.format("DD/MM/YYYY")}
              </div>

              <div>Numbers of dates booked: {2}</div>

              <div>Number of guest</div>
              <div>Adults: {bookingInfo?.adults}</div>
              <div>Children: {bookingInfo?.children}</div>

              <div>Total payment: ${200}</div>

              <Button
                variant="contained"
                className="mr-4"
                onClick={confirmBooking}
              >
                Confirm Booking and proceed to payment
              </Button>
            </Box>
          </Modal>
        </div>
      </div>

      <div className="w-1/4">
        <table className="border border-collapse border-slate-500">
          <tbody>
            <tr>
              <th>Room Type:</th>
              <td>{room?.roomType}</td>
            </tr>
            <tr>
              <th>Price per night:</th>
              <td>${room?.roomPrice}</td>
            </tr>
            <tr>
              <th>Room Service:</th>
              <td>
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
  );
}
