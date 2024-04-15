import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllRooms, getRoomTypes } from "../../api";
import { useNavigate } from "react-router-dom";

export default function RoomsBrowse() {
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

  function onFilter() {
    if (chosenRoomType.length < 1) {
      setFilteredRooms(rooms);
      return;
    }
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

  function bookRoom(roomId) {
    navigate(`/rooms/${roomId}/book`);
  }

  function FilteredRoomItems() {
    return filteredRooms.map((room) => {
      return (
        <div
          className="flex flex-row w-[45%] p-2 border-2 rounded-md mt-4 cursor-pointer"
          onClick={() => bookRoom(room?.id)}
        >
          <img
            src={`data:image;base64,${room.photo}`}
            alt="img"
            className="w-[20%] mr-2 rounded-lg border"
          />
          <div className="flex-1 pl-8 my-auto">
            <div className="font-semibold text-primary text-xl">
              {room.roomType}
            </div>
            <div className="text-lg font-thin text-yellow-500 tracking-[0.2rem]">
              {room.roomPrice} / night
            </div>
            <div>Additional infomation goes here for the guests..</div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="flex flex-col w-4/5 min-h-[100vh] mx-auto below-navbar">
      <div className="flex flex-row mt-8">
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
        </div>

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

      <div className="flex flex-wrap w-full justify-center items-center gap-8">
        <FilteredRoomItems />
      </div>
    </div>
  );
}
