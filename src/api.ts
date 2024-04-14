import axios from "axios";
import { Dayjs } from "dayjs";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

function getHeader() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function loginUser(loginInfo: any) {
  try {
    const response = await api.post("/auth/login", loginInfo);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function registerUser(registerInfo) {
  try {
    const response = await api.post("/auth/register", registerInfo);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createRoom(room: any) {
  try {
    const formData = new FormData();
    formData.append("roomType", room?.roomType);
    formData.append("roomPrice", room?.roomPrice);
    formData.append("photo", room?.photo);
    const response = await api.post("/rooms", formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function bookingRoom(roomId: any, booking: any) {
  try {
    booking.checkInDate = booking?.checkInDate.format("DD/MM/YYYY");
    booking.checkOutDate = booking?.checkOutDate.format("DD/MM/YYYY");
    const response = await api.post("/bookings", booking, {
      headers: getHeader(),
      params: {
        roomId,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/types");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllRooms() {
  try {
    const response = await api.get("/rooms");
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAvailableRooms(searchQuery: any) {
  try {
    const response = await api.get("/rooms", {
      params: {
        "check-in": (searchQuery?.checkIn as Dayjs).format("DD/MM/YYYY"),
        "check-out": (searchQuery?.checkOut as Dayjs).format("DD/MM/YYYY"),
        "room-type": searchQuery?.roomType,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getRoom(id: string) {
  try {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getBookingByCode(code: string) {
  try {
    const response = await api.get("/bookings", {
      params: {
        "confirmation-code": code,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllBookings() {
  try {
    const response = await api.get("/bookings", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserBookings(user: string) {
  try {
    const response = await api.get("/bookings", {
      headers: getHeader(),
      params: {
        username: user,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateRoom(room: any) {
  try {
    const formData = new FormData();
    formData.append("roomType", room?.roomType);
    formData.append("roomPrice", room?.roomPrice);
    formData.append("photo", room?.photo);
    const response = await api.put(`/rooms/${room?.id}`, formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteAccount() {
  try {
    const userId = localStorage.getItem("userId");
    const response = await api.delete(`/users/${userId}`, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteRoom(roomId: any) {
  try {
    const response = await api.delete(`/rooms/${roomId}`, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteBooking(bookingId: any) {
  try {
    const response = await api.delete(`/bookings/${bookingId}`, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
