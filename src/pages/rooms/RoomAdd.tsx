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
    <div className="below-navbar pt-8 min-h-[100vh] w-[40%] mx-auto">
      <div className="text-3xl font-bold">Add a new room</div>

      <div className="mt-8">
        <select
          title="Room Type Select"
          name="roomType"
          value={roomProps.roomType}
          onChange={onPropsChange}
          className="p-2 border-2 border-gray-300 rounded-[3px] h-14 w-full"
        >
          <option value="">Select Room Type</option>
          <option value="Add new">Add new</option>
          <TypeOpts />
        </select>
      </div>

      {isNewTypeDisplay && (
        <div className="flex flex-row w-full mt-4">
          <input
            type="text"
            title="Add new room type"
            value={newRoomType}
            onChange={onTypeInput}
            className="h-14 p-2 border-2 border-gray-300 rounded-[3px] flex-1 mr-4"
          />

          <Button
            variant="contained"
            onClick={addNewType}
            sx={{
              width: "10%",
            }}
          >
            Add
          </Button>
        </div>
      )}

      <TextField
        label="Room Price"
        type="number"
        name="roomPrice"
        value={roomProps.roomPrice}
        onChange={onPropsChange}
        sx={{
          marginTop: "1rem",
          width: "100%",
        }}
      />

      <input
        title="photo"
        type="file"
        onChange={onPhotoChange}
        className="block rounded-[3px] mt-4 w-full"
      />

      {reviewImg && (
        <img src={reviewImg} alt="Room Image" className="block mt-4" />
      )}

      <Button
        variant="contained"
        sx={{
          marginTop: "1rem",
        }}
        onClick={onRoomCreate}
      >
        Create Room
      </Button>
    </div>
  );
}
