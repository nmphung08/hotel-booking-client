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
    if (availableRooms?.length > 0) {
      return availableRooms.map((room) => {
        return (
          <div className="flex flex-col w-1/4">
            <img
              src={`data:image;base64,${room?.photo}`}
              alt="Room photo"
              className="w-full"
            />
            <div>{room?.roomType}</div>
            <div>{room?.roomPrice} / night</div>
            <Link to={`/rooms/${room?.id}/book`}>Book now</Link>
          </div>
        );
      });
    }
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
      <div className="h-[30vh] w-[70vw] flex flex-row justify-center items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Check-in Date"
            name="checkIn"
            value={searchProps.checkIn}
            onChange={(date) => {
              return onPropsChange("checkIn", date);
            }}
            className="mr-4"
          />

          <DatePicker
            label="Check-out Date"
            name="checkOut"
            value={searchProps.checkOut}
            onChange={(date) => {
              return onPropsChange("checkOut", date);
            }}
            className="mr-4"
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
            className="w-full"
          >
            <option value="">Select Room Type</option>
            <TypeOpts />
          </select>
        </div>

        <Button variant="contained" className="mr-4" onClick={onSearch}>
          Search
        </Button>

        <Button variant="contained" className="mr-4" onClick={onClear}>
          Clear
        </Button>
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center w-4/5 gap-4">
        <AvailableRooms />
      </div>
    </>
  );
}
