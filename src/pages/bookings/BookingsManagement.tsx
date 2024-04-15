import { Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { deleteBooking, getAllBookings } from "../../api";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const defaultDate = {
  checkIn: dayjs(new Date()),
  checkOut: dayjs(new Date()),
};

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [dates, setDates] = useState(defaultDate);
  useEffect(() => {
    getAllBookings().then((bookings) => {
      setBookings(bookings);
      setFilteredBookings(bookings);
    });
  }, []);

  function onDatesChange(name: string, value: any) {
    setDates({ ...dates, [name]: value });
  }

  function convertDateFormat(dateString: string) {
    if (dateString?.length > 0) {
      var parts = dateString.split("/");
      var newDateString = parts[1] + "/" + parts[0] + "/" + parts[2];
      return newDateString;
    }
    return Date.now().toString();
  }

  function onFilter() {
    setFilteredBookings(
      bookings.filter((booking) => {
        if (dates.checkIn && dates.checkOut) {
          const checkInDate = new Date(dates.checkIn.format("MM/DD/YYYY"));
          const checkOutDate = new Date(dates.checkOut.format("MM/DD/YYYY"));
          const bookingCheckIn = new Date(
            convertDateFormat(booking?.checkInDate)
          );
          const bookingCheckOut = new Date(
            convertDateFormat(booking?.checkOutDate)
          );
          return (
            checkInDate <= bookingCheckIn && checkOutDate >= bookingCheckOut
          );
        }
      })
    );
  }

  function onClear() {
    setDates(defaultDate);
  }

  function cancelBooking(booking) {
    deleteBooking(booking?.id).then();
  }

  function BookingRows() {
    return filteredBookings.map((booking) => {
      return (
        <tr>
          <td className="border border-slate-300 py-2 px-4">
            {booking?.room?.roomType}
          </td>
          <td className="border border-slate-300 py-2 px-4">
            {booking?.checkInDate}
          </td>
          <td className="border border-slate-300 py-2 px-4">
            {booking?.checkOutDate}
          </td>
          <td className="border border-slate-300 py-2 px-4">
            {booking?.adults}
          </td>
          <td className="border border-slate-300 py-2 px-4">
            {booking?.children}
          </td>
          <td className="border border-slate-300 py-2 px-4">
            {booking?.confirmationCode}
          </td>
          <td className="border border-slate-300 py-2 px-4 text-center">
            <Button
              variant="contained"
              onClick={() => cancelBooking(booking)}
              color="error"
              sx={{
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="flex flex-col below-navbar pt-8 min-h-[100vh]">
      <div className="text-3xl font-bold mx-auto">Bookings Management</div>

      <div className="flex flex-row items-center justify-center mt-8">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Check-in Date"
            name="checkIn"
            value={dates.checkIn}
            onChange={(date) => {
              return onDatesChange("checkIn", date);
            }}
            sx={{
              marginRight: "1rem",
            }}
          />

          <DatePicker
            label="Check-out Date"
            name="checkOut"
            value={dates.checkOut}
            onChange={(date) => {
              return onDatesChange("checkOut", date);
            }}
            sx={{
              marginRight: "1rem",
            }}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          sx={{
            marginLeft: "3rem",
            textTransform: "capitalize",
            backgroundColor: "rgb(20 184 166)",
            ":hover": {
              backgroundColor: "rgb(20 184 166)",
              opacity: "0.9",
            },
            width: "6vw",
          }}
          onClick={onFilter}
        >
          Filter
        </Button>

        <Button
          variant="contained"
          sx={{
            marginLeft: "1rem",
            backgroundColor: "gray",
            ":hover": {
              backgroundColor: "gray",
              opacity: "0.9",
            },
            textTransform: "capitalize",
            width: "6vw",
          }}
          onClick={onClear}
        >
          Clear
        </Button>
      </div>

      <table className="border-collapse border border-slate-400 w-[90%] mt-8 mx-auto">
        <thead>
          <tr>
            <th className="border border-slate-300 py-2 px-4">Room Type</th>
            <th className="border border-slate-300 py-2 px-4">Check-in Date</th>
            <th className="border border-slate-300 py-2 px-4">
              Check-out Date
            </th>
            <th className="border border-slate-300 py-2 px-4">Adults</th>
            <th className="border border-slate-300 py-2 px-4">Children</th>
            <th className="border border-slate-300 py-2 px-4">
              Confirmation Code
            </th>
            <th className="border border-slate-300 py-2 px-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          <BookingRows />
        </tbody>
      </table>
    </div>
  );
}
