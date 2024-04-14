import { useEffect, useState } from "react";
import { createRoom, getRoomTypes } from "../../api";
import { Button, TextField } from "@mui/material";

const defaultProps = {
  roomType: "",
  roomPrice: 0,
  photo: null,
};

export default function RoomAdd() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomProps, setRoomProps] = useState(defaultProps);
  const [reviewImg, setReviewImg] = useState(null);
  const [isNewTypeDisplay, setIsNewTypeDisplay] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  useEffect(() => {
    getRoomTypes().then((types) => {
      setRoomTypes(types);
    });
  }, []);

  function onPropsChange(e) {
    let { name, value } = e.target;
    if (name == "roomPrice" && !isNaN(value)) {
      value = parseInt(value);
    }
    if (value == "Add new") {
      setIsNewTypeDisplay(true);
      return;
    }
    setRoomProps({ ...roomProps, [name]: value });
  }

  function TypeOpts() {
    return roomTypes.map((type: string) => (
      <option value={type} selected={type == roomProps.roomType}>
        {type}
      </option>
    ));
  }

  function onPhotoChange(e) {
    const file = e.target.files[0];
    setReviewImg(URL.createObjectURL(file));
    setRoomProps({ ...roomProps, photo: file });
  }

  function onRoomCreate() {
    createRoom(roomProps);
  }

  function addNewType() {
    setRoomTypes([...roomTypes, newRoomType]);
    setNewRoomType("");
    setIsNewTypeDisplay(false);
  }

  function onTypeInput(e) {
    setNewRoomType(e.target.value);
  }

  return (
    <div>
      <div>Add a new room</div>

      <div>
        <select
          title="Room Type Select"
          name="roomType"
          value={roomProps.roomType}
          onChange={onPropsChange}
          className="w-full"
        >
          <option value="">Select Room Type</option>
          <option value="Add new">Add new</option>
          <TypeOpts />
        </select>
      </div>

      {isNewTypeDisplay && (
        <>
          <input
            type="text"
            title="Add new room type"
            value={newRoomType}
            onChange={onTypeInput}
          />

          <Button variant="contained" className="mr-4" onClick={addNewType}>
            Add
          </Button>
        </>
      )}

      <TextField
        label="Room Price"
        type="number"
        name="roomPrice"
        value={roomProps.roomPrice}
        onChange={onPropsChange}
      />

      <input
        title="photo"
        type="file"
        onChange={onPhotoChange}
        className="block"
      />

      {reviewImg && <img src={reviewImg} alt="Room Image" className="block" />}

      <Button variant="contained" className="block mr-4" onClick={onRoomCreate}>
        Create Room
      </Button>
    </div>
  );
}
