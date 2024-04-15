import { useEffect, useState } from "react";
import { deleteBooking, getUserBookings } from "../../api";
import { Button } from "@mui/material";

export default function History() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const username = localStorage.getItem("userId");
    getUserBookings(username).then((bookings) => {
      setBookings(bookings);
    });
  }, []);

  function removeBooking(bookingId) {
    deleteBooking(bookingId).then();
  }

  function convertDateFormat(dateString: string) {
    if (dateString?.length > 0) {
      var parts = dateString.split("/");
      var newDateString = parts[1] + "/" + parts[0] + "/" + parts[2];
      return newDateString;
    }
    return Date.now().toString();
  }

  function BookingRows() {
    if (bookings?.length > 0) {
      return bookings.map((booking) => (
        <tr>
          <td className="border border-slate-300 px-2 py-4">
            {booking?.room?.roomType}
          </td>
          <td className="border border-slate-300">
            <div className="w-full flex justify-center py-2">
              <img
                src={`data:image;base64,${booking?.room?.photo}`}
                title="Room photo"
                className="w-32 rounded-lg"
              />
            </div>
          </td>
          <td className="border border-slate-300 px-2 py-4">
            {booking?.checkInDate}
          </td>
          <td className="border border-slate-300 px-2 py-4">
            {booking?.checkOutDate}
          </td>
          <td className="border border-slate-300 px-2 py-4">
            {booking?.confirmationCode}
          </td>
          <td className="border border-slate-300 px-2 py-4">
            <Button
              color="error"
              variant="contained"
              sx={{
                textTransform: "capitalize",
              }}
              onClick={() => {
                removeBooking(booking?.id);
              }}
            >
              Cancel
            </Button>
          </td>
        </tr>
      ));
    }
  }

  return (
    <div className="below-navbar pt-8 min-h-[100vh] w-4/5 text-center mx-auto">
      <div className="text-3xl font-semibold">Booking History</div>

      <table className="border border-collapse border-slate-400 mt-8 w-full">
        <thead>
          <tr>
            <th className="border border-slate-300 px-2 py-4">Room Type</th>
            <th className="border border-slate-300 px-2 py-4">Photo</th>
            <th className="border border-slate-300 px-2 py-4">Check-in Date</th>
            <th className="border border-slate-300 px-2 py-4">
              Check-out Date
            </th>
            <th className="border border-slate-300 px-2 py-4">
              Confirmation Code
            </th>
            <th className="border border-slate-300 px-2 py-4">Action</th>
          </tr>
        </thead>

        <tbody>
          <BookingRows />
        </tbody>
      </table>
    </div>
  );
}
