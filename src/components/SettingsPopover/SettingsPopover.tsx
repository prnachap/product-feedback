"use client";
import Popover from "@mui/material/Popover";
import React, { Fragment } from "react";
import AccountIcon from "../../../public/assets/shared/account.svg";

const SettingsPopover = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "settings-popover" : undefined;
  return (
    <Fragment>
      <button onClick={handleClick}>
        <AccountIcon className="h-7 w-7" />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {children}
      </Popover>
    </Fragment>
  );
};

export default SettingsPopover;
