import { TextField } from "@mui/material";
import { useState } from "react";
import { getBookingByCode } from "../../api";

export default function BookingSearch() {
  const [confirmCode, setConfirmCode] = useState("");
  const [booking, setBooking] = useState(null);

  function findBooking() {
    getBookingByCode(confirmCode).then((booking) => {
      setBooking(booking);
    });
  }

  function BookingDetails() {
    return (
      booking?.id && (
        <div className="mt-8">
          <div>Booking Info</div>
          <div>Confirmation code: {booking.confirmationCode}</div>
          <div>Room type: {booking?.room?.roomType}</div>
          <div>Check-in Date: {booking?.checkInDate}</div>
          <div>Check-out Date: {booking?.checkOutDate}</div>
          <div>Adults: {booking?.adults}</div>
          <div>Children: {booking?.children}</div>
        </div>
      )
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-4/5">
      <div> Find my booking</div>

      <div>
        <TextField
          label="Confirmation Code"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
        />

        <button type="button" onClick={findBooking}>
          Find Booking
        </button>
      </div>

      <BookingDetails />
    </div>
  );
}
