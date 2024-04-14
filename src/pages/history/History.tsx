import { useEffect, useState } from "react";
import { useAuth } from "../../components/auth/AuthProvider";
import { getUserBookings } from "../../api";

export default function History() {
  const [bookings, setBookings] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    getUserBookings(auth.user).then((bookings) => {
      setBookings(bookings);
    });
  }, []);

  function BookingRows() {
    if (bookings?.length > 0) {
      return bookings.map((booking) => (
        <tr>
          <td>{booking?.room?.roomType}</td>
          <td>
            <img src={booking?.photo} title="Room photo" />
          </td>
          <td>{booking?.CheckInDate}</td>
          <td>{booking?.CheckInDate}</td>
          <td>{booking?.confirmationCode}</td>
        </tr>
      ));
    }
  }

  return (
    <div>
      <div>Booking History</div>

      <table>
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Photo</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Confirmation Code</th>
          </tr>
        </thead>

        <tbody>
          <BookingRows />
        </tbody>
      </table>
    </div>
  );
}
