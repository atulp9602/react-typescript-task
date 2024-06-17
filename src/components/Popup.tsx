import React, { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Stack, Typography } from "@mui/material";

interface PopupProps {
  isOpen?: boolean;
  handleClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Popup: FC<PopupProps> = ({
  isOpen = false,
  handleClose,
  title = "",
  children = <></>,
}) => {
  return (
    <Dialog maxWidth="md" open={isOpen} onClose={handleClose}>
      <DialogTitle>
        <Stack
          spacing={6}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexGrow={1}
          padding={2}
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
