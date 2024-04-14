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
          <td>{room?.id}</td>
          <td>{room?.roomType}</td>
          <td>{room?.roomPrice}</td>
          <td>
            <EditIcon onClick={() => editRoom(room)} />{" "}
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
    <div className="w-4/5">
      <div>Rooms Management</div>

      <div className="flex flex-row items-center justify-between">
        <div>
          <div>
            <select
              title="Room Type Select"
              name="roomType"
              value={chosenRoomType}
              onChange={onTypeChange}
              className="w-full"
            >
              <option value="">Select Room Type</option>
              <TypeOpts />
            </select>
          </div>

          <Button variant="contained" className="mr-4" onClick={onFilter}>
            Search
          </Button>

          <Button variant="contained" className="mr-4" onClick={onClear}>
            Clear
          </Button>
        </div>

        <Link to={"/rooms/add"}>
          <AddIcon /> Add room
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Type</th>
            <th>Room Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <RoomRows />
        </tbody>
      </table>
    </div>
  );
}
