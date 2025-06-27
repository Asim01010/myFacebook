import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import AddpostModal from "./AddpostModal";

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <button
        onClick={handleOpen}
        onClose={handleClose}
        className="w-full text-left rounded-full bg-gray-100 px-4 py-2 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
        aria-label="Create new post"
      >
        What's on your mind, {user.f_name}?
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
        }}
      >
        <AddpostModal handleClose={handleClose} />
      </Modal>
    </div>
  );
}
