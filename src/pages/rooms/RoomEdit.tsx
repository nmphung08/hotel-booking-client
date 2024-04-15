import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getRoom, updateRoom } from "../../api";
import { useParams } from "react-router-dom";

const defaultRoom = {
  id: 0,
  roomType: "",
  roomPrice: 0,
  photo: null,
};

export default function RoomEdit() {
  const [roomProps, setRoomProps] = useState(defaultRoom);
  const { id } = useParams();

  useEffect(() => {
    getRoom(id).then((room) => {
      setRoomProps(room);
    });
  }, []);

  function onPropsChange(name: string, value: any) {
    if (name == "roomPrice" && !isNaN(value)) {
      value = parseInt(value);
    }

    setRoomProps({ ...roomProps, [name]: value });
  }

  function editRoom() {
    updateRoom(roomProps).then();
  }

  return (
    <div className="below-navbar pt-8 w-[40%] min-h-[100vh] mx-auto">
      <div className="text-3xl font-bold">Edit room</div>

      <TextField
        label="Room Type"
        type="text"
        name="roomType"
        value={roomProps.roomType}
        sx={{
          marginTop: "2rem",
          width: "100%",
        }}
        onChange={(e) => onPropsChange("roomType", e.target.value)}
      />

      <TextField
        label="Room Price"
        type="number"
        name="roomPrice"
        value={roomProps.roomPrice}
        sx={{
          marginTop: "1rem",
          width: "100%",
        }}
        onChange={(e) => onPropsChange("roomPrice", e.target.value)}
      />

      <input
        title="photo"
        type="file"
        onChange={(e) => onPropsChange("photo", e.target?.["files"][0])}
        className="block rounded-[3px] mt-4 w-full"
      />

      {roomProps?.photo && (
        <img
          src={
            typeof roomProps?.photo == "object"
              ? URL.createObjectURL(roomProps?.photo)
              : `data:image;base64,${roomProps?.photo}`
          }
          alt="Room Image"
          className="mt-4"
        />
      )}

      <Button
        variant="contained"
        sx={{
          marginTop: "1rem",
        }}
        onClick={editRoom}
      >
        Edit ROom
      </Button>
    </div>
  );
}
