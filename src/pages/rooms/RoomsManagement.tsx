import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteRoom, getAllRooms, getRoomTypes } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RoomsManagement() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [chosenRoomType, setChosenRoomType] = useState("");
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getRoomTypes().then((types) => {
      setRoomTypes(types);
    });
    getAllRooms().then((rooms) => {
      setRooms(rooms);
      setFilteredRooms(rooms);
    });
  }, []);

  function editRoom(room) {
    navigate(`/rooms/${room?.id}/edit`);
  }

  function removeRoom(room) {
    deleteRoom(room?.id).then();
  }

  function RoomRows() {
    return filteredRooms.map((room) => {
      return (
        <tr>
          <td className="border border-slate-300 py-2 px-4">{room?.id}</td>
          <td className="border border-slate-300 py-2  px-4">
            {room?.roomType}
          </td>
          <td className="border border-slate-300 py-2 px-4">
            {room?.roomPrice}
          </td>
          <td className="border border-slate-300 py-2 px-4 text-center">
            <EditIcon onClick={() => editRoom(room)} />
            <DeleteIcon onClick={() => removeRoom(room)} />
          </td>
        </tr>
      );
    });
  }

  function TypeOpts() {
    return roomTypes.map((type: string) => (
      <option value={type}>{type}</option>
    ));
  }

  function onTypeChange(e) {
    setChosenRoomType(e.target.value);
  }

  function onFilter() {
    setFilteredRooms(
      rooms.filter(
        (room) =>
          (room.roomType as string).toLowerCase() ===
          chosenRoomType.toLowerCase()
      )
    );
  }

  function onClear() {
    setChosenRoomType("");
    setFilteredRooms(rooms);
  }

  return (
    <div className="w-4/5 mx-auto below-navbar pt-10 min-h-[100vh]">
      <div className="text-3xl font-semibold">Rooms Management</div>

      <div className="flex flex-row items-center justify-between mt-8">
        <div>
          <select
            title="Room Type Select"
            name="roomType"
            value={chosenRoomType}
            onChange={onTypeChange}
            className="p-2 border-2 border-gray-300 rounded-[3px] h-10 w-[30vw]"
          >
            <option value="">Select Room Type For Filter...</option>
            <TypeOpts />
          </select>

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

        <Link to={"/rooms/add"}>
          <AddIcon /> Add room
        </Link>
      </div>

      <table className="border-collapse border border-slate-400 w-full mt-8">
        <thead>
          <tr>
            <th className="border border-slate-300">ID</th>
            <th className="border border-slate-300">Room Type</th>
            <th className="border border-slate-300">Room Price</th>
            <th className="border border-slate-300">Actions</th>
          </tr>
        </thead>

        <tbody>
          <RoomRows />
        </tbody>
      </table>
    </div>
  );
}
