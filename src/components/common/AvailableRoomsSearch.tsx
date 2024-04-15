import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { getAvailableRooms, getRoomTypes } from "../../api";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Link } from "react-router-dom";

const defaultSearchProps = {
  checkIn: dayjs(new Date()),
  checkOut: dayjs(new Date()),
  roomType: "",
};

export default function AvailableRoomsSearch() {
  const [searchProps, setSearchProps] = useState(defaultSearchProps);
  const [roomTypes, setRoomTypes] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    getRoomTypes().then((types) => {
      setRoomTypes(types);
    });
  }, []);

  function TypeOpts() {
    if (roomTypes?.length < 1) {
      return;
    }
    let i = 0;
    return roomTypes.map((type: string) => {
      i++;
      return <option value={type}>{type}</option>;
    });
  }

  function AvailableRooms() {
    return availableRooms.map((room) => {
      return (
        <div className="flex flex-col w-1/4 h-full bg-white border-2 rounded-lg shadow-md">
          <img
            src={`data:image;base64,${room?.photo}`}
            alt="Room photo"
            className="w-full rounded-t-lg h-3/5"
          />
          <div className="flex flex-col justify-center w-full p-4 h-2/5">
            <div className="text-xl font-semibold text-primary">
              {room?.roomType}
            </div>
            <div className="font-thin tracking-wider text-yellow-600">
              ${room?.roomPrice} / night
            </div>
            <Link
              to={`/rooms/${room?.id}/book`}
              className="inline-block w-1/2 mt-2 text-center text-white rounded-md bg-primary hover:opacity py-1 hover:opacity-90"
            >
              Book now
            </Link>
          </div>
        </div>
      );
    });
  }

  function onSearch() {
    getAvailableRooms(searchProps).then((rooms) => {
      setAvailableRooms(rooms);
    });
  }

  function onClear() {
    setSearchProps(defaultSearchProps);
  }

  function onPropsChange(name: string, value: any) {
    setSearchProps({ ...searchProps, [name]: value });
  }

  return (
    <>
      <div className="h-[30vh] w-[80vw] flex flex-row justify-center items-center m-auto shadow-lg px-8 rounded-md">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Check-in Date"
            name="checkIn"
            value={searchProps.checkIn}
            onChange={(date) => {
              return onPropsChange("checkIn", date);
            }}
            className="w-1/5"
            sx={{
              marginRight: "1rem",
            }}
          />

          <DatePicker
            label="Check-out Date"
            name="checkOut"
            value={searchProps.checkOut}
            onChange={(date) => {
              return onPropsChange("checkOut", date);
            }}
            className="w-1/5"
            sx={{
              marginRight: "1rem",
            }}
          />
        </LocalizationProvider>

        <div>
          <select
            title="Room Type Select"
            name="roomType"
            value={searchProps.roomType}
            onChange={(e) => {
              return onPropsChange("roomType", e.target.value);
            }}
            className="p-2 border-2 border-gray-300 rounded-[3px] h-14"
          >
            <option value="">Select Room Type</option>
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
          }}
          onClick={onSearch}
        >
          Search
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
          }}
          onClick={onClear}
        >
          Clear
        </Button>
      </div>

      {availableRooms?.length > 0 && (
        <div className="flex flex-row flex-wrap items-center justify-center w-[80vw] h-[22rem] gap-16 m-auto p-8 bg-gray-100 mt-8 shadow-lg rounded-md">
          <AvailableRooms />
        </div>
      )}
    </>
  );
}
