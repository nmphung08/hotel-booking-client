import { Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { deleteBooking, getAllBookings } from "../../api";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const defaultDate = {
  checkIn: null,
  checkOut: null,
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

  function onDatesChange(e) {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  }

  function onFilter() {
    setFilteredBookings(
      bookings.filter((booking) => {
        if (dates.checkIn && dates.checkOut) {
          const checkInDate = (dates.checkIn as Dayjs).toDate();
          const checkOutDate = (dates.checkOut as Dayjs).toDate();
          const bookingCheckIn = new Date(booking?.checkInDate);
          const bookingCheckOut = new Date(booking?.checkOutDate);
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
          <td>{booking?.room?.roomType}</td>
          <td>{booking?.checkInDate}</td>
          <td>{booking?.checkOutDate}</td>
          <td>{booking?.adults}</td>
          <td>{booking?.children}</td>
          <td>{booking?.confirmationCode}</td>
          <td>
            <Button
              variant="contained"
              className="mr-4"
              onClick={() => cancelBooking(booking)}
            >
              Cancel
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="flex flex-col">
      <div>Bookings Management</div>

      <div>Filter booking by date</div>

      <div className="flex flex-row items-center justify-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Check-in Date"
            name="checkIn"
            value={dates.checkIn as never}
            onChange={onDatesChange}
            className="mr-4"
          />

          <DatePicker
            label="Check-out Date"
            name="checkOut"
            value={dates.checkOut as never}
            onChange={onDatesChange}
            className="mr-4"
          />
        </LocalizationProvider>

        <Button variant="contained" className="mr-4" onClick={onFilter}>
          Filter
        </Button>

        <Button variant="contained" className="mr-4" onClick={onClear}>
          Clear
        </Button>
      </div>

      <table>
        <thead>
          <tr>
            <td>Room Type</td>
            <td>Check-in Date</td>
            <td>Check-out Date</td>
            <td>Adults</td>
            <td>Children</td>
            <td>Confirmation Code</td>
            <td>Actions</td>
          </tr>
        </thead>

        <tbody>
          <BookingRows />
        </tbody>
      </table>
    </div>
  );
}
