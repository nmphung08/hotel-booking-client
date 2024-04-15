import { TextField } from "@mui/material";
import { useState } from "react";
import { deleteBooking, getBookingByCode } from "../../api";

export default function BookingSearch() {
  const [confirmCode, setConfirmCode] = useState("");
  const [booking, setBooking] = useState(null);

  function findBooking() {
    getBookingByCode(confirmCode).then((booking) => {
      setBooking(booking);
    });
  }

  function cancelBooking(bookingId) {
    deleteBooking(bookingId).then();
  }

  function BookingDetails() {
    return (
      booking?.id && (
        <div className="mt-8 w-3/5">
          <div className="text-3xl font-semibold">Booking Info</div>
          <div className="text-green-600 text-xl mt-8">
            Confirmation code: {booking.confirmationCode}
          </div>
          <div className="text-xl mt-4">
            Room type: {booking?.room?.roomType}
          </div>
          <div className="text-xl mt-4">
            Check-in Date: {booking?.checkInDate}
          </div>
          <div className="text-xl mt-4">
            Check-out Date: {booking?.checkOutDate}
          </div>
          <div className="text-xl mt-4">Adults: {booking?.adults}</div>
          <div className="text-xl mt-4">Children: {booking?.children}</div>
          <button
            type="button"
            onClick={() => cancelBooking(booking?.id)}
            className="text-xl mt-4 py-2 px-4 bg-red-500 rounded-md text-white"
          >
            Cancel booking
          </button>
        </div>
      )
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-4/5 mx-auto below-navbar min-h-[100vh]">
      <div className="text-3xl font-semibold mt-16"> Find my booking</div>

      <div className="flex flex-row w-3/5 mt-8">
        <TextField
          label="Confirmation Code"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
          sx={{
            flex: "1 1 0%",
          }}
          className="border-[0px]"
        />

        <button
          type="button"
          onClick={findBooking}
          className="ml-8 w-[10vw] bg-primary text-white text-lg font-semibold rounded-sm"
        >
          Find Booking
        </button>
      </div>

      <BookingDetails />
    </div>
  );
}
