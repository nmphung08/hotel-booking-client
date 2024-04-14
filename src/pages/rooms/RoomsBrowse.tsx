import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllRooms, getRoomTypes } from "../../api";
import { Link } from "react-router-dom";

export default function RoomsBrowse() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [chosenRoomType, setChosenRoomType] = useState("");
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  useEffect(() => {
    getRoomTypes().then((types) => {
      setRoomTypes(types);
    });
    getAllRooms().then((rooms) => {
      setRooms(rooms);
      setFilteredRooms(rooms);
    });
  }, []);

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

  function onTypeChange(e) {
    setChosenRoomType(e.target.value);
  }

  function TypeOpts() {
    return roomTypes.map((type: string) => (
      <option value={type}>{type}</option>
    ));
  }

  function FilteredRoomItems() {
    return filteredRooms.map((room) => {
      return (
        <div className="w-1/3 p-2">
          <img
            src={`data:image;base64,${room.photo}`}
            alt="img"
            className="w-1/3 mr-2"
          />
          <div className="flex-1">
            <div>{room.roomType}</div>
            <div>{room.roomPrice} / night</div>
            <Link to={`/rooms/${room?.id}/book`}>Book now</Link>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="flex items-center justify-center w-4/5">
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

      <div className="flex flex-row flex-wrap w-full gap-2 j">
        <FilteredRoomItems />
      </div>
    </div>
  );
}
