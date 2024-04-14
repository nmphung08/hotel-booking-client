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
    <div>
      <div>Edit room</div>

      <TextField
        label="Room Type"
        type="text"
        name="roomType"
        value={roomProps.roomType}
        onChange={(e) => onPropsChange("roomType", e.target.value)}
      />

      <TextField
        label="Room Price"
        type="number"
        name="roomPrice"
        value={roomProps.roomPrice}
        onChange={(e) => onPropsChange("roomPrice", e.target.value)}
      />

      <TextField
        label="Room Photo"
        type="file"
        name="photo"
        onChange={(e) => onPropsChange("photo", e.target?.["files"][0])}
      />

      {roomProps?.photo && (
        <img
          src={
            typeof roomProps?.photo == "object"
              ? URL.createObjectURL(roomProps?.photo)
              : `data:image;base64,${roomProps?.photo}`
          }
          alt="Room Image"
        />
      )}

      <Button variant="contained" className="mr-4" onClick={editRoom}>
        Edit ROom
      </Button>
    </div>
  );
}
